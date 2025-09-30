import mongoose from "mongoose";
import menuitemModel from "../model/menuItemModel.js";
import ProductModel from "../model/productModel.js";
import registerModel from "../model/registerModel.js";
import userOrderModel from "../model/userOrderModel.js";
import organizationModel from "../model/organizationModel.js";
import notificationService from "./notificationService.js";
import notificationModel from "../model/notificationModel.js";

const kitchenService = {
  getMenuitem: async (Category, menuName, io) => {
    try {
      const filter = {};

      if (Category) {
        filter.Category = Category;
        console.log("Applying filter - Category:", filter.Category);
      }

      if (menuName) {
        filter.menuName = menuName;
        console.log("Applying filter - menuName:", filter.menuName);
      }

      console.log("Final filter object:", filter);

      const fetchedData = await menuitemModel
        .find(filter)
        .select("Category menuName")
        .lean();

      if (fetchedData.length === 0) {
        io.emit("menuItemResponse", {
          // Change from io.emit to socket.emit
          statusCode: 404,
          message: "No items found for the specified criteria.",
        });
        return;
      }

      // Group data by Category
      const groupedData = fetchedData.reduce((accumulator, currentItem) => {
        const category = currentItem.Category;
        if (!accumulator[category]) {
          accumulator[category] = [];
        }
        accumulator[category].push({ menuName: currentItem.menuName });
        return accumulator;
      }, {});

      const responseData = Object.keys(groupedData).map((category) => ({
        Category: category,
        items: groupedData[category],
      }));

      console.log("Formatted Response Data:", responseData);

      io.emit("getMenuitem", {
        // Make sure to use the same event name
        statusCode: 200,
        data: responseData,
      });
    } catch (error) {
      console.error("Error fetching menu items:", error.message);
      io.emit("menuItemResponse", {
        statusCode: 500,
        message: "Internal Server Error: " + error.message,
      });
    }
  },
  //====================================================
  getoverallDate: async (input) => {
    if (
      typeof input === "undefined" ||
      typeof input.timestamp === "undefined" ||
      typeof input.org_id === "undefined"
    ) {
      throw new Error("The time parameter is required.");
    }

    const dateObject = new Date(input.timestamp);
    if (isNaN(dateObject.getTime())) {
      throw new Error(
        "Invalid date format. Please provide a valid date string."
      );
    }

    const startOfDay = new Date(dateObject.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateObject.setHours(23, 59, 59, 999));

    try {
      const dates = await menuitemModel.find({
        org_id: input.org_id,
        timestamp: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      if (dates.length === 0) {
        throw new Error("No dates found for the specified time");
      }

      // Format the output
      return dates.map((date) => ({
        timestamp: date.timestamp.toISOString().split("T")[0],
        ...date.toObject(),
      }));
    } catch (error) {
      console.log("Error fetching dates: " + error.message);
      throw error;
    }
  },

  //===================================================
  removeOverallId: async (_id) => {
    console.log(_id);
    try {
      const existingRecords = await menuitemModel.find({ _id: { $in: _id } });
      if (existingRecords.length === 0) {
        return { deletedCount: 0 };
      }
      const deleteResult = await menuitemModel.deleteMany({
        _id: { $in: _id },
      });
      return { deletedCount: deleteResult.deletedCount };
    } catch (error) {
      throw new Error(`Failed to remove kitchen IDs: ${error.message}`);
    }
  },
  //==============================================================

  //===========================================================
  getproductNameCategory: async (ProductCatagory, ProductName) => {
    try {
      const filter = {};
      if (ProductCatagory) {
        filter.ProductCatagory = ProductCatagory;
        console.log("Fetching by ProductCatagory:", filter.ProductCatagory);
      }
      if (ProductName && ProductName.name) {
        filter["ProductName.name"] = ProductName.name;
        console.log("Fetching by ProductName:", filter["ProductName.name"]);
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const duplicates = await ProductModel.aggregate([
        { $match: filter },
        {
          $group: {
            _id: {
              ProductCatagory: "$ProductCatagory",
              ProductName: "$ProductName.name",
            },
            count: { $sum: 1 },
            items: { $push: "$$ROOT" },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ]);
      const result = duplicates.flatMap((duplicate) => duplicate.items);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Error fetching products: " + error.message);
    }
  },

  //============================================================
  /*getallUserOrder: async () => {
        try {
            const orders = await userOrderModel.find();
    
            // Create an object to hold unique products
            const uniqueProducts = {};
    
            // Iterate over each order
            orders.forEach(order => {
                order.Dishes.forEach(dish => {
                    const productName = dish.ProductName[0].name; // Assuming there's always a name
    
                    // If the product doesn't exist in uniqueProducts, add it
                    if (!uniqueProducts[productName]) {
                        uniqueProducts[productName] = {
                            Product_id: dish.Product_id,
                            ProductImage: dish.ProductImage,
                            ProductCatagory: dish.ProductCatagory,
                            KitchenSection: dish.KitchenSection,
                            OnlineRate: dish.OnlineRate,
                            TakeawayRate: dish.TakeawayRate,
                            Barcode: dish.Barcode,
                            Price: dish.Price,
                            CatagoryIcon: dish.CatagoryIcon,
                            Available: dish.ProductName[0].Available, // Assuming you want the availability status
                            quantity: 0 // Initialize quantity for summation
                        };
                    }
    
                    // Increment the quantity for each unique product found
                    uniqueProducts[productName].quantity += order.quantity;
                });
            });
    
            // Convert the uniqueProducts object to an array
            return Object.values(uniqueProducts); // This will return an array of unique products
        } catch (error) {
            throw error;
        }
    }
    ,*/
  //==============================================================
  updateUserOrder: async (data) => {
    const { admin_id, org_id, userorder_id, Dishes } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const updateUserOrder = await userOrderModel.findByIdAndUpdate(
        userorder_id,
        {
          Dishes,
        },
        { new: true }
      );
      return updateUserOrder;
    } catch (error) {
      throw error;
    }
  },
  // ====================

  /* 
 updateStatusKds: async (data) => {
    const { admin_id, org_id, userorder_id, dish_id, status } = data;
    console.log("Received Data:", data);

    if (!dish_id) {
      return {
        statusCode: 400,
        message: "Invalid input: dish_id must be provided.",
      };
    }

    if (!userorder_id) {
      return {
        statusCode: 400,
        message: "Invalid input: order_id must be provided.",
      };
    }

    const cleanStatus = status ? status.trim() : "";
    if (!cleanStatus) {
      return {
        statusCode: 400,
        message: "Invalid input: status must be provided.",
      };
    }

    try {
      // Admin verification (unchanged)
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return {
          statusCode: 404,
          message: "Admin not found.",
        };
      }

      // Convert IDs to ObjectId (unchanged)
      let orderObjectId, dishObjectId;
      try {
        orderObjectId = new mongoose.Types.ObjectId(userorder_id);
        dishObjectId = new mongoose.Types.ObjectId(dish_id);
      } catch (error) {
        return {
          statusCode: 400,
          message: "Invalid ID format.",
        };
      }

      // Find the order (unchanged)
      const userOrder = await userOrderModel.findById(orderObjectId);
      if (!userOrder) {
        return {
          statusCode: 404,
          message: "Order not found.",
        };
      }

      // Find the specific dish
      const currentDish = userOrder.Dishes.find(dish => 
        dish._id.toString() === dish_id.toString()
      );

      if (!currentDish) {
        return {
          statusCode: 404,
          message: `Dish not found in this order. Searched for dish_id: ${dish_id}`,
        };
      }

      // Status transition validation (unchanged)
      if (currentDish.status !== "Processing") {
        return {
          statusCode: 400,
          message: `Cannot update dish status. Current status is "${currentDish.status}". Only dishes with "Processing" status can be updated.`,
        };
      }

      // Improved update using arrayFilters
      const updateResult = await userOrderModel.findOneAndUpdate(
        {
          _id: orderObjectId,
          "Dishes._id": dishObjectId
        },
        {
          $set: {
            "Dishes.$[elem].status": cleanStatus,
            "Dishes.$[elem].updatedAt": new Date()
          }
        },
        {
          arrayFilters: [{ "elem._id": dishObjectId }],
          new: true
        }
      );

      if (!updateResult) {
        return {
          statusCode: 400,
          message: "Failed to update dish status.",
        };
      }

      // Find the updated dish in the result
      const updatedDish = updateResult.Dishes.find(
        dish => dish._id.toString() === dish_id.toString()
      );

      return {
        statusCode: 200,
        message: "Dish status updated successfully.",
        data: {
          order_id: userOrder._id,
          dish_id: updatedDish._id,
          menuName: updatedDish.menuName,
          previousStatus: currentDish.status,
          newStatus: updatedDish.status,
        },
      };
    } catch (error) {
      console.error("Error updating dish status:", error);
      return {
        statusCode: 500,
        message: "Internal server error: " + error.message,
      };
    }
  }, */

  updateStatusKds: async (data) => {
    const { admin_id, org_id, userorder_id, dish_id, status } = data;
    if (!admin_id || !org_id) {
      throw new Error("both fields are required");
    }

    if (!userorder_id || !dish_id || !status) {
      throw new Error("Missing userorder_id, dish_id, or status.");
    }

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found.");
      }

      // Fetch the order
      const order = await userOrderModel.findById(userorder_id);
      if (!order) {
        throw new Error("Order not found.");
      }

      // Find the matching dish
      const targetDishIndex = order.Dishes.findIndex(
        (d) =>
          d._id.toString() === dish_id.toString() && d.status === "Processing"
      );

      if (targetDishIndex === -1) {
        throw new Error("Dish not found or not in 'Processing' status.");
      }

      // Update the dish status
      order.Dishes[targetDishIndex].status = status;
      await order.save();
      const dishName = order.Dishes[targetDishIndex].menuName;
      const message = `🧆 "${dishName}" for Table ${order.TableName} is ready to serve. Please deliver the food promptly.`;
      //  const message = `🧆 "${dish_id}" for Table ${order.TableName} is ready to serve. Please deliver the food promptly.`;
      await notificationModel.create({
        title: "✅ Food Ready to Serve",
        message,
        type: "foodReady",
        admin_id,
        org_id,
      });

      /* if (admin?.fcmToken) {
        await notificationService.sendFcmToAdmin(admin.fcmToken, {
          title: "✅ Food Ready to Serve",
          body: message,
        });
      } */

      await notificationService.sendFcmToAdmin(org_id, {
        title: "✅ Food Ready to Serve",
        body: message,
      });
     
     /*  await notificationService.sendNotifyToWaiter(org_id, {
        title: "✅ Food Ready to Serve",
        body: message,
      }); */

      return {
        statusCode: 200,
        message: "Dish status updated successfully.",
        updatedDish: order.Dishes[targetDishIndex],
        table_id: order.table_id,
        userorder_id: userorder_id,
      };
    } catch (error) {
      console.error("Error updating dish status:", error);
      throw error;
    }
  },
  // ============================
  getUserOrderHistory: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      // Get the current date and set it to midnight to filter today's orders
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const orderHistory = await userOrderModel
        .find({
          org_id: org_id,
          "Dishes.status": "Foodready",
          timestamp: { $gte: startOfToday, $lte: endOfToday },
        })
        .select(
          "Dishes quantity menuName TableName TableType timestamp KOT_No Bill_No"
        );

      console.log("Fetched Order History:", orderHistory);

      // Step 2: Use a map to group orders by TableName
      const groupedOrders = new Map();

      orderHistory.forEach((order) => {
        const { TableName, TableType, timestamp, Bill_No, KOT_No, Dishes } =
          order;
        const filteredDishes = Dishes.filter(
          (dish) => dish.status === "Foodready"
        );

        if (filteredDishes.length > 0) {
          if (!groupedOrders.has(TableName)) {
            // Initialize a new entry for this table
            groupedOrders.set(TableName, {
              TableName,
              TableType,
              timestamp,
              Bill_No,
              KOT_No,
              Dishes: [], // Initialize an empty array for dishes
            });
          }

          // Step 3: Aggregate the dishes by menuName
          const tableEntry = groupedOrders.get(TableName);
          filteredDishes.forEach((dish) => {
            const { menuName, quantity } = dish;

            // Check if the dish already exists in the Dishes array
            const existingDish = tableEntry.Dishes.find(
              (item) => item.menuName === menuName
            );

            if (existingDish) {
              // If it exists, increase the quantity
              existingDish.quantity += quantity;
            } else {
              // If it doesn't exist, add a new entry
              tableEntry.Dishes.push({ menuName, quantity });
            }
          });
        }
      });

      // Step 4: Convert the map to an array format for the response
      const filteredOrderHistory = Array.from(groupedOrders.values());

      console.log("Filtered Order History:", filteredOrderHistory);

      if (filteredOrderHistory.length === 0) {
        return {
          statusCode: 404,
          message: 'No orders with "Foodready" status found for today.',
        };
      }

      return {
        statusCode: 200,
        data: filteredOrderHistory,
      };
    } catch (error) {
      console.error("Error fetching order history:", error.message);
      return {
        statusCode: 500,
        message: "Internal server error: " + error.message,
      };
    }
  },

  //================================================================
  getTotalOrder: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const orders = await userOrderModel.find(
        {
          timestamp: { $gte: startOfDay, $lt: endOfDay },
        },
        { "Dishes.menuName": 1, "Dishes.quantity": 1, "Dishes.status": 1 }
      );

      const totalQuantities = {};

      orders.forEach((order) => {
        order.Dishes.forEach((dish) => {
          if (dish.status === "Processing") {
            totalQuantities[dish.menuName] =
              (totalQuantities[dish.menuName] || 0) + dish.quantity;
          }
        });
      });

      return {
        statusCode: 200,
        data: totalQuantities,
      };
    } catch (error) {
      console.error("Error getting total order:", error.message);

      return {
        statusCode: 500,
        message: "Internal Server Error: " + error.message,
      };
    }
  },

  // ================
  getAllUserOrder: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      const currentDate = new Date();
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

      const overallData = await userOrderModel
        .find({
          org_id,
          timestamp: { $gte: startOfDay, $lt: endOfDay },
          "Dishes.status": "Processing",
        })
        .select(
          "TableName Dishes.quantity Dishes.menuName Dishes.menu_Category_id Dishes.menu_item_id Dishes._id OrderType Dishes.Parcel timestamp _id Dishes.status table_id KOT_No Bill_No"
        );

      const formattedResponse = overallData.map((order) => ({
        KOT_No: order.KOT_No,
        Bill_No: order.Bill_No,
        TableName: order.TableName,
        timestamp: order.timestamp,
        table_id: order.table_id,
        userorder_id: order._id,
        OrderType: order.OrderType,
        Dishes: order.Dishes.filter((dish) => dish.status === "Processing").map(
          (dish) => ({
            menuName: dish.menuName,
            quantity: dish.quantity,
            menu_Category_id: dish.menu_Category_id,
            menu_item_id: dish.menu_item_id,
            status: dish.status,
            dish_id: dish._id,
            Parcel: dish.Parcel,
          })
        ),
      }));

      // Return the response
      return {
        statusCode: 200,
        data: formattedResponse,
      };
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      return {
        statusCode: 500,
        message: "Internal Server Error: " + error.message,
      };
    }
  },

  //=====================================================================================
  getoverallDate: async (input) => {
    try {
      const inputDate = new Date(input.timestamp);

      const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

      const getAllDate = await userOrderModel.find({
        org_id: input.org_id,
        timestamp: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      return getAllDate;
    } catch (error) {
      throw error;
    }
  },

  //========================================================
  updateMenuName: async (data) => {
    const { admin_id, org_id, menu_item_id, available } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }

      console.log(menu_item_id, "jhg");
      const updatedProduct = await menuitemModel.findOneAndUpdate(
        { "menuItems._id": menu_item_id, org_id },
        { $set: { "menuItems.$.available": available } },
        { new: true }
      );
      console.log(updatedProduct, "jhg");
      if (!updatedProduct) {
        throw new Error("Menu item not found or could not be updated.");
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating menu item:", error.message);
      throw error;
    }
  },

  //==================================================
  getTablenameType: async (data) => {
    const { admin_id, org_id, TableName, TableType } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const records = await userOrderModel.find({
        TableName: TableName,
        TableType: TableType,
      });

      if (!records || records.length === 0) {
        throw new Error(
          "No records found for the given TableName and TableType"
        );
      }

      return records;
    } catch (error) {
      console.error("Error fetching records:", error);
      throw new Error("Error fetching records: " + error.message);
    }
  },
};

export default kitchenService;
