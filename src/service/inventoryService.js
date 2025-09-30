import auditReportModel from "../model/AuditReportModel.js";
import inventoryModel from "../model/InventoryModel.js";
import inventoryMomentModel from "../model/inventoryMoment.js";
import inventoryUsageModel from "../model/inventoryUsageModel.js";
import locationModel from "../model/locationModel.js";
import notificationModel from "../model/notificationModel.js";
import organizationModel from "../model/organizationModel.js";
import ProductModel from "../model/productModel.js";
import PurchaseModel from "../model/purchaseHistoryModel.js";
import purchaseItermModel from "../model/purchaseOrderItemModel.js";
import purchaseModel from "../model/PurchaseOrderModel.js";
import registerModel from "../model/registerModel.js";
import stockValidationModel from "../model/StockValuationReports.js";
import supplierModel from "../model/SupplierModel.js";
import UsageReportModel from "../model/UsageReportsModel.js";
import userModel from "../model/userModel.js";
import userRegModel from "../model/userRegModel.js";
import notificationService from "./notificationService.js";
const inventoryService = {
  inventory: async (data) => {
    const {
      admin_id,
      org_id,
      ProductName,
      Unit,
      Price,
      location_name,
      Purchase_Date,
      expire_date,
      stock_quantity,
      stock_status,
    } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }

      const products = await ProductModel.create({
        admin_id,
        org_id,
        ProductName,
        Unit,
        Price,
        Purchase_Date,
        expire_date,
        stock_quantity,
        stock_status,
      });

      const location = await locationModel.create({
        admin_id,
        org_id,
        location_name,
      });

      const registerProduct = await inventoryModel.create({
        admin_id,
        org_id,
        Product_id: products._id,
        location_id: location._id,
      });
      return registerProduct;
    } catch (error) {
      throw error;
    }
  },

  //============================================================================================

  addOrPurchaseProduct: async (data) => {
    const {
      admin_id,
      org_id,
      ProductName,
      Unit,
      purchase_price,
      quantity_purchased,
      storageLocation,
      minStock,
      expire_date,
      Purchase_Date,
    } = data;

    try {
      const [org, admin] = await Promise.all([
        organizationModel.findById(org_id),
        registerModel.findById(admin_id),
      ]);
      if (!org) throw new Error("Organization not found");
      if (!admin) throw new Error("Admin not found");

      let product = await ProductModel.findOne({ org_id, ProductName });
      let isNew = false;

      if (product) {
        await ProductModel.findByIdAndUpdate(
          product._id,
          {
            $inc: {
              stock_quantity: quantity_purchased,
              totalPurchase_Price: purchase_price,
            },
            $set: {
              recentPurchase_date: Purchase_Date,
              recentExpire_date: expire_date,
            },
          },
          { new: true }
        );
      } else {
        isNew = true;
        product = await ProductModel.create({
          admin_id,
          org_id,
          ProductName,
          Unit,
          totalPurchase_Price: purchase_price,
          storageLocation,
          minStock,
          recentPurchase_date: Purchase_Date,
          recentExpire_date: expire_date,
          stock_quantity: quantity_purchased,
        });
      }

      const purchase = await PurchaseModel.create({
        admin_id,
        org_id,
        Product_id: product._id,
        ProductName,
        purchase_price,
        quantity_purchased,
        unit: Unit,
        purchase_date: Purchase_Date,
        expire_date: expire_date,
      });

      return {
        message: isNew
          ? "Product added and purchase logged"
          : "Stock updated and purchase logged",
        product,
        purchase,
      };
    } catch (error) {
      throw error;
    }
  },

  //with unit price
  /* addOrPurchaseProduct: async (data) => {
    const {
      admin_id,
      org_id,
      ProductName,
      Unit,
      unit_price,
      quantity_purchased,
      storageLocation,
      minStock,
      expire_date,
      Purchase_Date,
    } = data;

    try {
      const [org, admin] = await Promise.all([
        organizationModel.findById(org_id),
        registerModel.findById(admin_id),
      ]);
      if (!org) throw new Error("Organization not found");
      if (!admin) throw new Error("Admin not found");
      const total_price = unit_price * quantity_purchased;
      let product = await ProductModel.findOne({ org_id, ProductName });
      let isNew = false;

      if (product) {
        product.stock_quantity += quantity_purchased;
        product.totalPurchase_Price += total_price;
        await product.save();
      } else {
        isNew = true;
        product = await ProductModel.create({
          admin_id,
          org_id,
          ProductName,
          Unit,
          totalPurchase_Price: total_price,
          storageLocation,
          minStock,
          Purchase_Date: Purchase_Date,
          expire_date,
          stock_quantity: quantity_purchased,
        });
      }

      const purchase = await PurchaseModel.create({
        admin_id,
        org_id,
        product_id: product._id,
        ProductName,
        unit_price,
        purchase_price: total_price,
        quantity_purchased,
        purchase_date: Purchase_Date,
      });

      return {
        message: isNew
          ? "Product added and purchase logged"
          : "Stock updated and purchase logged",
        product,
        purchase,
      };
    } catch (error) {
      throw error;
    }
  },
 */

  getAllProducts: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const prods = await ProductModel.find({ org_id });
      return prods;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (data) => {
    const {
      admin_id,
      org_id,
      Product_id,
      ProductName,
      storageLocation,
      minStock,
      Purchase_Date,
      expire_date,
    } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const prod = await ProductModel.findById(Product_id);
      if (!prod) {
        throw new Error("product not found");
      }
      const duplicate = await ProductModel.findOne({
        _id: { $ne: Product_id },
        org_id,
        ProductName,
        // ProductName: { $regex: new RegExp('^' + ProductName + '$', 'i') },
      });

      if (duplicate) {
        throw new Error("Product name must be unique within the organization");
      }
      const updateData = {
        ProductName,
        storageLocation,
        minStock,
        Purchase_Date,
        expire_date,
      };
      const updateProd = await ProductModel.findOneAndUpdate(
        { _id: Product_id, org_id },
        updateData,
        { new: true }
      );
      console.log(updateProd);

      return updateProd;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (data) => {
    const { org_id, Product_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const product = await ProductModel.findOne({ _id: Product_id, org_id });
      if (!product) {
        throw new Error("product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  },

  getUsageaUsers: async (data) => {
    const { org_id } = data;
    try {
      const admin = await registerModel.findOne(
        { org_id },
        { _id: 1, userName: 1, email: 1 }
      );
      const orgUser = await userRegModel.find(
        { org_id, role: { $in: ["Kitchen", "Accounts"] } },
        { _id: 1, emp_name: 1, EmailId: 1 }
      );
      return { admin, orgUser };
    } catch (error) {
      throw error;
    }
  },

  usageInventory: async (data) => {
    const {
      org_id,
      admin_id,
      date,
      taken_quantity,
      unit,
      action_type,
      used_by,
      Product_id,
    } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }
      const prod = await ProductModel.findById(Product_id);
      if (!prod) {
        throw new Error("Product not found");
      }

      const unitConversion = {
        gram: { base: "kg", factor: 1 / 1000 },
        kg: { base: "kg", factor: 1 },
        ml: { base: "litre", factor: 1 / 1000 },
        litre: { base: "litre", factor: 1 },
        piece: { base: "piece", factor: 1 },
        packet: { base: "packet", factor: 1 },
      };

      if (!unitConversion[unit]) {
        throw new Error(`Unsupported usage unit: ${unit}`);
      }

      const { base, factor } = unitConversion[unit];

      if (prod.Unit !== base && unit !== prod.Unit) {
        throw new Error(
          `Unit mismatch: product is stored in '${prod.Unit}', but usage unit is '${unit}'`
        );
      }

      const adjustedQty =
        unit === prod.Unit
          ? taken_quantity
          : parseFloat((taken_quantity * factor).toFixed(2)); // round to 2 decimals

      if (adjustedQty > prod.stock_quantity) {
        throw new Error("Not enough stock available");
      }

      const remaining = parseFloat(
        (prod.stock_quantity - adjustedQty).toFixed(2)
      ); // round to 2 decimals

      const usedHistory = await inventoryUsageModel.create({
        org_id,
        admin_id,
        Product_id,
        ProductName: prod.ProductName,
        taken_quantity: adjustedQty,
        unit: prod.Unit,
        action_type,
        used_by,
        available_unit: remaining,
        date,
      });

      const usedProdUpdate = await ProductModel.findOneAndUpdate(
        { _id: Product_id, org_id },
        { stock_quantity: remaining },
        { new: true }
      );

      if (remaining < prod.minStock) {
        const stockMessage = `${prod.ProductName} stock is low: ${remaining} ${prod.Unit} left (Minimum required: ${prod.minStock}).`;

        await notificationModel.create({
          title: "⚠️ Low Stock Alert",
          message: stockMessage,
          type: "stockAlert",
          admin_id,
          org_id,
          product_id: Product_id,
        });

        if (admin?.fcmToken) {
          await notificationService.sendFcmToAdmin(admin.fcmToken, {
            title: "⚠️ Low Stock Alert",
            body: stockMessage,
          });
        }
      }

      return { usedHistory, usedProdUpdate };
    } catch (error) {
      console.error("Inventory Usage Error:", error);
      throw error;
    }
  },

  getAllUsageHistory: async (data) => {
    const { org_id, fromDate, toDate, action_type, used_by, Product_id } =data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }

      const query = { org_id };

      if (Product_id && Product_id !== "All") {
        query.Product_id = Product_id;
      }

      if (action_type && action_type !== "All") {
        query.action_type = action_type;
      }

      if (used_by && used_by !== "All") {
        query.used_by = used_by;
      }

      if (fromDate && !toDate) {
        query.date = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(fromDate + "T23:59:59.999Z"),
        };
      } else if (fromDate && toDate) {
        query.date = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(toDate + "T23:59:59.999Z"),
        };
      }

      const usageList = await inventoryUsageModel
        .find(query)
        .sort({ timestamp: -1 });

      return usageList;
    } catch (error) {
      throw error;
    }
  },

  getSearchProd: async (data) => {
    const { org_id, startsWith } = data;

    try {
      const query = { org_id }; // Ensure org_id is always filtered

      if (startsWith) {
        const regex = new RegExp("^" + startsWith, "i"); // case-insensitive
        query.ProductName = { $regex: regex };
      }

      const filteredProducts = await ProductModel.find(query);
      return filteredProducts;
    } catch (error) {
      throw error;
    }
  },

  deleteUsageHistory: async (data) => {
    const { org_id, inventoryUsage_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const removeUsage = await inventoryUsageModel.findOneAndDelete({
        org_id,
        _id: inventoryUsage_id,
      });
      if (!removeUsage) {
        throw new Error("product not found");
      }
      return removeUsage;
    } catch (error) {
      throw error;
    }
  },

  getPurchaseHistory: async (data) => {
    const { org_id, fromDate, toDate } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const query = { org_id };
      if (fromDate && !toDate) {
        query.timestamp = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(fromDate + "T23:59:59.999Z"),
        };
      } else if (fromDate && toDate) {
        query.timestamp = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(toDate + "T23:59:59.999Z"),
        };
      }

      const purchase = await PurchaseModel.find(query).sort({ timestamp: -1 });
      return purchase;
    } catch (error) {
      throw error;
    }
  },

  getSingleProdPurchase: async (data) => {
    const { org_id, Product_id, fromDate, toDate } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const prod = await ProductModel.findOne({ org_id, _id: Product_id });
      if (!prod) {
        throw new Error("product not found");
      }
      const query = { org_id, Product_id };
      if (fromDate && !toDate) {
        query.timestamp = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(fromDate + "T23:59:59.999Z"),
        };
      } else if (fromDate && toDate) {
        query.timestamp = {
          $gte: new Date(fromDate + "T00:00:00.000Z"),
          $lte: new Date(toDate + "T23:59:59.999Z"),
        };
      }

      const prodPurchase = await PurchaseModel.find(query).sort({
        timestamp: -1,
      });
      return prodPurchase;
    } catch (error) {
      throw error;
    }
  },

  deletepurchase: async (data) => {
    const { org_id, purchaseHistory_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const removePurchase = await PurchaseModel.findOneAndDelete({
        org_id,
        _id: purchaseHistory_id,
      });
      if (!removePurchase) {
        throw new Error("purchase not found");
      }
      return removePurchase;
    } catch (error) {
      throw error;
    }
  },

  //  ================================================================================
  getinventory: async (inventory_id) => {
    console.log(inventory_id, "in");
    try {
      const getinventory = await inventoryModel.findById(inventory_id);
      console.log(getinventory, "jj");
      const location = await locationModel.findOne({
        _id: getinventory.location_id,
      });

      return {
        inventory: getinventory,
        location: location,
      };
    } catch (error) {
      throw error;
    }
  },

  //   -------------------------
  updateInventory: async (data) => {
    const {
      admin_id,
      org_id,
      location_id,
      inventory_id,
      Product_id,
      ProductName,
      Unit,
      Price,
      location_name,
      Purchase_Date,
      expire_date,
      stock_quantity,
      stock_status,
    } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Room not found for this organization");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const inventory = await inventoryModel.findById(inventory_id);
      if (!inventory) {
        throw new Error("inventory not found");
      }

      const products = await ProductModel.findByIdAndUpdate(
        Product_id,
        {
          ProductName,
          Unit,
          Price,
          Purchase_Date,
          expire_date,
          stock_quantity,
          stock_status,
        },
        { new: true }
      );

      const location = await locationModel.findByIdAndUpdate(
        location_id,
        { location_name },
        { new: true }
      );

      return { products, location, msg: "updated successfully" };
    } catch (error) {
      throw error;
    }
  },
  // =================
  /* deleteinventory: async (data) => {
    const { inventory_id, org_id } = data;
    try {
      const removeProducts = await inventoryModel.findOneAndDelete({
        org_id,
        _id: inventory_id,
      });
      return removeProducts;
    } catch (error) {
      throw error;
    }
  }, */

  deleteinventory: async (data) => {
    const { Product_id, org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const removeProducts = await ProductModel.findOneAndDelete({
        org_id,
        _id: Product_id,
      });
      if (!removeProducts) {
        throw new Error("product not found");
      }
      return removeProducts;
    } catch (error) {
      throw error;
    }
  },
  //   ==================
  getallInventory: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      // Fetch all inventory records
      const overallProduct = await inventoryModel.find({ org_id });

      // Fetch the corresponding location and product data for each inventory item
      const inventoryWithDetails = await Promise.all(
        overallProduct.map(async (inventory) => {
          const location = await locationModel.findOne({
            org_id,
            _id: inventory.location_id,
          });
          const product = await ProductModel.findOne({
            org_id,
            _id: inventory.Product_id,
          });

          // Return the inventory item with the location and product details
          return {
            ...inventory._doc, // Spread the inventory data (ensure to include ._doc if using Mongoose)
            location: location, // Add location data
            product: product, // Add product data
          };
        })
      );

      return inventoryWithDetails;
    } catch (error) {
      throw error;
    }
  },

  //   -----------------------
  getAllInventory: async (filters) => {
    console.log(filters, "l");
    try {
      const { location_name, stock_status } = filters;

      const filter = {};

      if (location_name) {
        const locationData = await locationModel.findOne({ location_name });
        if (locationData) {
          filter.location = locationData._id;
        } else {
          throw new Error(`Location with name "${location_name}" not found`);
        }
      }

      if (stock_status) {
        filter.stock_status = stock_status;
      }

      const inventoryItems = await inventoryModel.find(filter);

      return inventoryItems;
    } catch (error) {
      console.error("Error in getAllInventory:", error);
      throw error;
    }
  },

  // ===============================
  suppliers: async (data) => {
    const { supplier_name, contact_information, address } = data;
    try {
      const suppliers = await supplierModel.create({
        supplier_name,
        contact_information,
        address,
      });
      return suppliers;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getSuppliers: async (supplier_id) => {
    console.log(supplier_id, "in");
    try {
      const getSuppliers = await supplierModel.findById(supplier_id);
      return getSuppliers;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  updateSuppliers: async (supplier_id, data) => {
    const { supplier_name, contact_information, address } = data;

    try {
      const updateSuppliers = await supplierModel.findByIdAndUpdate(
        supplier_id,
        {
          supplier_name,
          contact_information,
          address,
        },
        {
          new: true,
        }
      );

      return updateSuppliers;
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  },
  // ---------------------------------
  getAllSuppliers: async (data) => {
    const { supplier_name, contact_information, address } = data;
    try {
      const filter = {};
      if (supplier_name)
        filter.supplier_name = {
          $regex: supplier_name,
          $options: "i",
        };
      if (contact_information) filter.contact_information = contact_information;
      if (address) filter.address = address;
      const suppliers = await supplierModel.find(filter);
      return suppliers;
    } catch (error) {
      throw error;
    }
  },
  // =======================
  purchaseOrders: async (data) => {
    const { supplier_id, status, total_amount } = data;
    try {
      const purchaseOrders = await purchaseModel.create({
        supplier_id,
        status,
        total_amount,
      });
      return purchaseOrders;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getPurchaseOrders: async (PurchaseOrder_id) => {
    console.log(PurchaseOrder_id, "in");
    try {
      const getPurchaseOrders = await purchaseModel.findById(PurchaseOrder_id);
      return getPurchaseOrders;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  updatePurchaseOrder: async (PurchaseOrder_id, data) => {
    const { supplier_id, status, total_amount } = data;
    console.log(data);
    try {
      const updatePurchaseOrder = await purchaseModel.findByIdAndUpdate(
        PurchaseOrder_id,
        {
          supplier_id,
          status,
          total_amount,
        },
        {
          new: true,
        }
      );

      return updatePurchaseOrder;
    } catch (error) {
      console.error("Error updating PurchaseOrder:", error);
      throw error;
    }
  },
  // ---------------------------------
  getAllPurchaseOrder: async (data) => {
    const { startDate, endDate, status } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.order_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.order_date = {
          $gte: start, // From start of the day
          $lte: end, // Until the end of the day
        };
      }

      if (status) {
        filter.status = status;
      }

      console.log("Filter:", filter); // For debugging purposes
      const purchaseOrders = await purchaseModel.find(filter);
      return purchaseOrders;
    } catch (error) {
      throw error;
    }
  },
  // ===================
  purchaseOrderItems: async (data) => {
    const { PurchaseOrder_id, product_id, quantity, price } = data;
    try {
      const purchaseOrderItems = await purchaseItermModel.create({
        PurchaseOrder_id,
        product_id,
        quantity,
        price,
      });
      return purchaseOrderItems;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getpurchaseOrderItems: async (PurchaseOrderItem_id) => {
    console.log(PurchaseOrderItem_id, "in");
    try {
      const getpurchaseOrderItems = await purchaseItermModel.findById(
        PurchaseOrderItem_id
      );
      return getpurchaseOrderItems;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  updatepurchaseOrderItems: async (PurchaseOrderItem_id, data) => {
    const { product_id, quantity, price } = data;
    console.log(data);
    try {
      const updatepurchaseOrderItems =
        await purchaseItermModel.findByIdAndUpdate(
          PurchaseOrderItem_id,
          {
            product_id,
            quantity,
            price,
          },
          {
            new: true,
          }
        );

      return updatepurchaseOrderItems;
    } catch (error) {
      console.error("Error updating PurchaseOrder:", error);
      throw error;
    }
  },
  // ---------------------------------
  getAllpurchaseOrderItems: async (data) => {
    const { startDate, endDate, status } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.order_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.order_date = {
          $gte: start, // From start of the day
          $lte: end, // Until the end of the day
        };
      }

      if (status) {
        filter.status = status;
      }

      console.log("Filter:", filter); // For debugging purposes
      const getAllpurchaseOrderItems = await purchaseItermModel.find(filter);
      return getAllpurchaseOrderItems;
    } catch (error) {
      throw error;
    }
  },
  //   ==============================
  locations: async (data) => {
    const { location_name, address } = data;
    try {
      const locations = await locationModel.create({
        location_name,
        address,
      });
      return locations;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getlocations: async (location_id) => {
    try {
      const getlocations = await locationModel.findById(location_id);
      return getlocations;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  updatelocations: async (location_id, data) => {
    const { location_name, address } = data;

    try {
      const updatelocations = await locationModel.findByIdAndUpdate(
        location_id,
        {
          location_name,
          address,
        },
        {
          new: true,
        }
      );

      return updatelocations;
    } catch (error) {
      console.error("Error updatelocations:", error);
      throw error;
    }
  },
  // ---------------------------------
  getAlllocations: async (filters) => {
    try {
      const query = {};

      if (filters.location_name) {
        query.location_name = filters.location_name;
      }

      if (filters.address) {
        query.address = filters.address;
      }
      const location = await locationModel.find(query);
      return location;
    } catch (error) {
      throw error;
    }
  },
  // -------------------
  inventoryMovements: async (data) => {
    const { inventory_id, movement_type, quantity, movement_date } = data;
    try {
      const inventoryMovements = await inventoryMomentModel.create({
        inventory_id,
        movement_type,
        quantity,
        movement_date,
      });
      return inventoryMovements;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getinventoryMovements: async (movement_id) => {
    try {
      const getinventoryMovements = await inventoryMomentModel.findById(
        movement_id
      );
      return getinventoryMovements;
    } catch (error) {
      throw error;
    }
  },
  // ===============================

  // ---------------------------------
  getAllinventoryMovements: async (data) => {
    const { startDate, endDate, movement_type } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.movement_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.movement_date = {
          $gte: start,
          $lte: end,
        };
      }

      if (movement_type) {
        filter.movement_type = movement_type;
      }

      console.log("Filter:", filter);
      const getAllinventoryMovements = await inventoryMomentModel.find(filter);
      return getAllinventoryMovements;
    } catch (error) {
      throw error;
    }
  },
  // ----------------------
  stockValuationReports: async (data) => {
    const { total_value, report_data } = data;
    try {
      const stockValuationReports = await stockValidationModel.create({
        total_value,
        report_data,
      });
      return stockValuationReports;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getstockValuationReports: async (report_id) => {
    try {
      const getstockValuationReports = await stockValidationModel.findById(
        report_id
      );
      return getstockValuationReports;
    } catch (error) {
      throw error;
    }
  },
  // ---------------------
  getAllstockValuationReports: async (data) => {
    const { startDate, endDate } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.report_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.report_date = {
          $gte: start,
          $lte: end,
        };
      }

      console.log("Filter:", filter);
      const getAllstockValuationReports = await stockValidationModel.find(
        filter
      );
      return getAllstockValuationReports;
    } catch (error) {
      throw error;
    }
  },
  // ============================
  usageReports: async (data) => {
    const { total_value, report_data } = data;
    try {
      const usageReports = await UsageReportModel.create({
        total_value,
        report_data,
      });
      return usageReports;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getusageReports: async (report_id) => {
    try {
      const getusageReports = await UsageReportModel.findById(report_id);
      return getusageReports;
    } catch (error) {
      throw error;
    }
  },
  // ---------------------
  getAllusageReports: async (data) => {
    const { startDate, endDate } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.report_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.report_date = {
          $gte: start,
          $lte: end,
        };
      }

      console.log("Filter:", filter);
      const getAllstockValuationReports = await UsageReportModel.find(filter);
      return getAllstockValuationReports;
    } catch (error) {
      throw error;
    }
  },
  // -----------------------
  auditReports: async (data) => {
    const { total_value, report_data } = data;
    try {
      const auditReports = await auditReportModel.create({
        total_value,
        report_data,
      });
      return auditReports;
    } catch (error) {
      throw error;
    }
  },
  // ==============================
  getauditReports: async (report_id) => {
    try {
      const getauditReports = await auditReportModel.findById(report_id);
      return getauditReports;
    } catch (error) {
      throw error;
    }
  },
  // ---------------------
  getAllauditReports: async (data) => {
    const { startDate, endDate } = data;

    try {
      const filter = {};

      if (startDate && endDate) {
        filter.report_date = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the range (full day)
        };
      }
      // If only startDate is provided, fetch data exactly matching that date (ignoring time)
      else if (startDate) {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setUTCHours(23, 59, 59, 999); // End of the day

        filter.report_date = {
          $gte: start,
          $lte: end,
        };
      }
      console.log("Filter:", filter);
      const getAllstockValuationReports = await auditReportModel.find(filter);
      return getAllstockValuationReports;
    } catch (error) {
      throw error;
    }
  },
};
export default inventoryService;
