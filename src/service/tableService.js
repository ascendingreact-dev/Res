import reservationModel from "../model/reservationModel.js";
import tableAssignmentModel from "../model/tableAssignmentModel.js";
import tableTurnoverModel from "../model/tableTurnoverModel.js";
import waitingListModel from "../model/waitingListModel.js";
import userModel from "../model/userModel.js";
import TablesModel from "../model/TablesModel.js";
import userOrderModel from "../model/userOrderModel.js";
import statusColorModel from "../model/statusColorModel.js";
import RoomTableModel from "../model/roomsModel.js";
import menuCategoryModel from "../model/menuCategory.js";
import registerModel from "../model/registerModel.js";
import organizationModel from "../model/organizationModel.js";
import Calculation from "../../Calculation.js";
import admin from "../../firebaseConfig.js";
import notificationService from "./notificationService.js";
import notificationModel from "../model/notificationModel.js";

const tableService = {
  //new

  getWaiterTables: async (data) => {
    const { EmailId, org_id } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");

      const waiter = await userModel.findOne({
        EmailId,
        role: "Waiter",
        org_id,
      });
      if (!waiter) throw new Error("Waiter not found");

      const waiterTableNames = waiter.Tables || [];

      const allRoomDocs = await RoomTableModel.find({ org_id });

      const filteredData = allRoomDocs
        .map((doc) => {
          const matchedRooms = doc.rooms.filter((r) =>
            waiterTableNames.includes(r.Tablename)
          );
          if (matchedRooms.length === 0) return null;
          return {
            table_id: doc._id,
            org_id: doc.org_id,
            admin_id: doc.admin_id,
            rooms: matchedRooms,
          };
        })
        .filter(Boolean);

      return filteredData;
    } catch (error) {
      throw error;
    }
  },

  //===================================================
  reservations: async (data) => {
    const {
      admin_id,
      org_id,
      reservation_id,
      customer_id,
      table_id,
      reservation_date,
      reservation_time,
    } = data;
    try {
      const reservationCreate = await reservationModel.create({
        admin_id,
        org_id,
        reservation_id,
        customer_id,
        table_id,
        reservation_date,
        reservation_time,
      });
      return reservationCreate;
    } catch (error) {
      throw error;
    }
  },
  //==================================================
  getReservations: async (admin_id, org_id, reservation_id) => {
    try {
      const reservationsId = await reservationModel.findById(reservation_id);
      return reservationsId;
    } catch (error) {
      throw error;
    }
  },
  //==============================================
  updateReservations: async (data) => {
    const {
      admin_id,
      org_id,
      reservation_id,
      customer_id,
      table_id,
      reservation_date,
      reservation_time,
    } = data;
    try {
      const reservationsUpdate = await reservationModel.findByIdAndUpdate(
        reservation_id,
        {
          customer_id,
          table_id,
          reservation_date,
          reservation_time,
        },
        {
          new: true,
        }
      );
      return reservationsUpdate;
    } catch (error) {
      throw error;
    }
  },
  //============================================
  deleteReservations: async (admin_id, org_id, reservation_id) => {
    try {
      const deletedetails = await reservationModel.findByIdAndDelete(
        reservation_id
      );
      return deletedetails;
    } catch (error) {
      throw error;
    }
  },
  //============================================
  overallReservations: async () => {
    try {
      const reservationsId = await reservationModel.find();
      return reservationsId;
    } catch (error) {
      throw error;
    }
  },
  //==========================================
  tableAssignments: async (data) => {
    const {
      admin_id,
      org_id,
      assignment_id,
      order_ide,
      table_id,
      assignment_date,
      assignment_time,
    } = data;
    try {
      const tableAssignmentsCreate = await tableAssignmentModel.create({
        admin_id,
        org_id,
        assignment_id,
        order_ide,
        table_id,
        assignment_date,
        assignment_time,
      });
      return tableAssignmentsCreate;
    } catch (error) {
      throw error;
    }
  },
  //===========================================
  getTableAssignments: async (admin_id, org_id, assignment_id) => {
    try {
      const tableAssignmentIdOnly = await tableAssignmentModel.findById(
        assignment_id
      );
      return tableAssignmentIdOnly;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  updateTableAssignments: async (data) => {
    const {
      admin_id,
      org_id,
      assignment_id,
      order_ide,
      table_id,
      assignment_date,
      assignment_time,
    } = data;
    try {
      const updateDetails = await tableAssignmentModel.findByIdAndUpdate(
        assignment_id,
        {
          order_ide,
          table_id,
          assignment_date,
          assignment_time,
        },
        {
          new: true,
        }
      );
      return updateDetails;
    } catch (error) {
      throw error;
    }
  },
  //=========================================
  getallTablesAssignments: async () => {
    try {
      const tableAssignmentsId = await tableAssignmentModel.find();
      return tableAssignmentsId;
    } catch (error) {
      throw error;
    }
  },
  //=========================================
  tableTurnover: async (data) => {
    const {
      admin_id,
      org_id,
      turnover_id,
      table_id,
      occupied_start_time,
      occupied_end_time,
      total_turnover_time,
    } = data;
    try {
      const tableTurnoverCreate = await tableTurnoverModel.create({
        admin_id,
        org_id,
        turnover_id,
        table_id,
        occupied_start_time,
        occupied_end_time,
        total_turnover_time,
      });
      return tableTurnoverCreate;
    } catch (error) {
      throw error;
    }
  },
  //=======================================
  getTableTurnover: async (admin_id, org_id, turnover_id) => {
    try {
      const turnOverId = await tableTurnoverModel.findById(turnover_id);
      return turnOverId;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  getAlltableTurnover: async () => {
    try {
      const getAllDetails = await tableTurnoverModel.find();
      return getAllDetails;
    } catch (error) {
      throw error;
    }
  },
  //==============================================
  waitingList: async (data) => {
    const {
      admin_id,
      org_id,
      waitlist_id,
      customer_id,
      waitlist_date,
      estimated_wait_time,
      status,
    } = data;
    try {
      const createWaitingList = await waitingListModel.create({
        admin_id,
        org_id,
        waitlist_id,
        customer_id,
        waitlist_date,
        estimated_wait_time,
        status,
      });
      return createWaitingList;
    } catch (error) {
      throw error;
    }
  },
  //====================================================
  getWaitingList: async (admin_id, org_id, waitlist_id) => {
    try {
      const getIddetails = await waitingListModel.findById(waitlist_id);
      return getIddetails;
    } catch (error) {
      throw error;
    }
  },
  //===========================================
  updateWaitingList: async (data) => {
    const {
      admin_id,
      org_id,
      waitlist_id,
      customer_id,
      waitlist_date,
      estimated_wait_time,
      status,
    } = data;
    try {
      const updateDetails = await waitingListModel.findByIdAndUpdate(
        waitlist_id,
        {
          customer_id,
          waitlist_date,
          estimated_wait_time,
          status,
        },
        {
          new: true,
        }
      );
      return updateDetails;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  getAllwaitingList: async () => {
    try {
      const getAllDetails = await waitingListModel.find();
      return getAllDetails;
    } catch (error) {
      throw error;
    }
  },
  //====================================
  users: async (data) => {
    const {
      admin_id,
      org_id,
      category,
      Tablename,
      floor,
      name,
      email,
      phone_number,
      address,
      special_requests,
    } = data;
    try {
      if (!org) {
        throw new Error("organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const createCustomer = await userModel.create({
        admin_id,
        org_id,
        category,
        Tablename,
        floor,
        address,
        name,
        email,
        phone_number,
        special_requests,
      });
      return createCustomer;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  getUsers: async (admin_id, org_id, customer_id) => {
    try {
      const getIdUsers = await userModel.findById(customer_id);
      return getIdUsers;
    } catch (error) {
      throw error;
    }
  },
  //==============================================
  auditTrails: async () => {
    try {
      const tableAssignments = await tableAssignmentModel.find();
      const reservations = await reservationModel.find();

      return {
        tableAssignments,
        reservations,
      };
    } catch (error) {
      throw error;
    }
  },
  //=============================================
  tables: async (data) => {
    const {
      admin_id,
      org_id,
      table_id,
      table_number,
      seating_capacity,
      status,
      location,
    } = data;
    try {
      const createTables = await TablesModel.create({
        admin_id,
        org_id,
        table_id,
        table_number,
        seating_capacity,
        status,
        location,
      });
      return createTables;
    } catch (error) {
      throw new error();
    }
  },
  //===================================
  getTables: async (admin_id, org_id, table_id) => {
    try {
      const getTableId = await TablesModel.findById(table_id);
      return getTableId;
    } catch (error) {
      throw error;
    }
  },
  //====================================
  updateTables: async (data) => {
    const {
      admin_id,
      org_id,
      table_id,
      status,
      table_number,
      seating_capacity,
      location,
    } = data;

    try {
      let updateResult;

      if (table_id) {
        updateResult = await TablesModel.findByIdAndUpdate(
          table_id,
          {
            table_number,
            seating_capacity,
            status,
            location,
          },
          {
            new: true,
          }
        );
      } else if (status) {
        updateResult = await TablesModel.findOneAndUpdate(
          {
            status,
          },
          {
            table_number,
            seating_capacity,
            location,
          },
          {
            new: true,
          }
        );
      } else {
        throw new Error("Either table_id or status must be provided.");
      }
      return {
        updateResult,
      };
    } catch (error) {
      throw error;
    }
  },
  //===================================================

  // userOrder: async (data) => {
  //     if (!data) {
  //         throw new Error("No data received.");
  //     }

  //     const { admin_id, org_id, table_id, employee_id, TableStatus, newDish, TableName, TableType, userorde_id } = data;

  //     if (!table_id  || !newDish || !TableName || !Array.isArray(newDish) || newDish.length === 0) {
  //         throw new Error("Missing required fields: table_id, newDishArray, or TableName.");
  //     }

  //     for (let dish of newDish) {
  //         if (typeof dish.Price === 'undefined' || typeof dish.quantity === 'undefined') {
  //             throw new Error(`Dish with ID ${dish.menu_Category_id} is missing price or quantity.`);
  //         }
  //     }

  //     try {
  //         const admin = await registerModel.findById(admin_id);
  //         if (!admin) {
  //             return { message: "Admin not found" };
  //         }

  //         const gst = await organizationModel.findById(org_id);
  //         if (!gst) {
  //             throw new Error("Organization GST not found.");
  //         }

  //         for (let newDishArray of newDish) {
  //             const category = await menuCategoryModel.findById(newDishArray.menu_Category_id);
  //             if (!category) {
  //                 throw new Error(`Category with ID ${newDishArray.menu_Category_id} not found.`);
  //             }
  //         }

  //         const existingOrder = await userOrderModel.findOne({_id: userorde_id });
  //         const org = await organizationModel.findById(org_id);
  //         const previousKotNo = org.KOT_No;
  //         const previousBillNo = org.Bill_No;
  //         const KOT = await Calculation.generateKOT(previousKotNo);
  //         const Bill_No = await Calculation.generateBill(previousBillNo);

  //         await organizationModel.findByIdAndUpdate(org_id, {
  //             KOT_No: KOT,
  //             Bill_No: Bill_No
  //         });

  //         const newOrder = await userOrderModel.create({
  //             admin_id,
  //             org_id,
  //             table_id,
  //             userorde_id: existingOrder ? existingOrder._id : null,
  //             employee_id,
  //             TableStatus,
  //             status: "Processing",
  //             Dishes: newDish.map(dish => ({
  //                 ...dish,
  //                 status: "Processing",
  //             })),
  //             TableName,
  //             TableType,
  //             KOT_No: KOT,
  //             Bill_No: Bill_No,
  //             old_Kot_no: existingOrder ? existingOrder.KOT_No : null,
  //             TotalAmount: 0,
  //             CGST: 0,
  //             SGST: 0,
  //             GSTAmount: 0
  //         });

  //         const computedTotalAmount = await Calculation.totalAmount(newOrder.Dishes);
  //         const totalAmountWithGst = Calculation.calculateTotalWithGst(computedTotalAmount, TableType, gst.Gst);

  //         newOrder.TotalAmount = totalAmountWithGst.totalAmountWithGst;
  //         newOrder.CGST = totalAmountWithGst.cgstAmount;
  //         newOrder.SGST = totalAmountWithGst.sgstAmount;
  //         newOrder.GSTAmount = totalAmountWithGst.totalGstAmount;

  //         await newOrder.save();

  //         return newOrder;

  //     } catch (error) {
  //         console.error("Error processing order:", error.message);
  //         throw error;
  //     }
  // },

  // ==================
  // userOrder: async (data) => {
  //     if (!data) {
  //         throw new Error("No data received.");
  //     }

  //     const { admin_id, org_id, table_id, employee_id, TableStatus, newDish, TableName, TableType, userorde_id, discountRate } = data;

  //     if (!table_id || !newDish || !TableName || !Array.isArray(newDish) || newDish.length === 0) {
  //         throw new Error("Missing required fields: table_id, newDishArray, or TableName.");
  //     }

  //     for (let dish of newDish) {
  //         if (typeof dish.Price === 'undefined' || typeof dish.quantity === 'undefined') {
  //             throw new Error(`Dish with ID ${dish.menu_Category_id} is missing price or quantity.`);
  //         }
  //     }

  //     try {
  //         const admin = await registerModel.findById(admin_id);
  //         if (!admin) {
  //             return { message: "Admin not found" };
  //         }

  //         const gst = await organizationModel.findById(org_id);
  //         if (!gst) {
  //             throw new Error("Organization GST not found.");
  //         }

  //         for (let newDishArray of newDish) {
  //             const category = await menuCategoryModel.findById(newDishArray.menu_Category_id);
  //             if (!category) {
  //                 throw new Error(`Category with ID ${newDishArray.menu_Category_id} not found.`);
  //             }
  //         }

  //         const existingOrder = await userOrderModel.findOne({_id: userorde_id });
  //         const org = await organizationModel.findById(org_id);
  //         const previousKotNo = org.KOT_No;
  //         const previousBillNo = org.Bill_No;
  //         const KOT = await Calculation.generateKOT(previousKotNo);
  //         const Bill_No = await Calculation.generateBill(previousBillNo);

  //         await organizationModel.findByIdAndUpdate(org_id, {
  //             KOT_No: KOT,
  //             Bill_No: Bill_No
  //         });

  //         const newOrder = await userOrderModel.create({
  //             admin_id,
  //             org_id,
  //             table_id,
  //             userorde_id: existingOrder ? existingOrder._id : null,
  //             employee_id,
  //             TableStatus,
  //             status: "Processing",
  //             Dishes: newDish.map(dish => ({
  //                 ...dish,
  //                 status: "Processing",
  //             })),
  //             TableName,
  //             TableType,
  //             KOT_No: KOT,
  //             Bill_No: Bill_No,
  //             old_Kot_no: existingOrder ? existingOrder.KOT_No : null,
  //             TotalAmount: 0,
  //             CGST: 0,
  //             SGST: 0,
  //             GSTAmount: 0,
  //             DiscountAmount: 0,
  //             totalAmountWithGst:0,
  //             SubTotal:0,
  //         });

  //         const subTotal = await Calculation.totalAmount(newOrder.Dishes);

  //         // Calculate total amount with GST
  //         const totalAmountWithGst = Calculation.calculateTotalWithGst(subTotal, TableType, gst.Gst);
  // console.log(totalAmountWithGst,"totalAmountWithGst");
  //         // Parse discountRate if it's provided as a percentage string (e.g., "5%")
  //         let discountAmount = 0;
  //         if (discountRate && typeof discountRate === 'string' && discountRate.includes('%')) {
  //             const numericDiscount = parseFloat(discountRate.replace('%', ''));
  //             if (!isNaN(numericDiscount) && numericDiscount > 0) {
  //                 discountAmount = totalAmountWithGst.totalAmountWithGst * (numericDiscount / 100);
  //             }
  //         }
  // console.log(discountAmount,"discountAmount")
  //         // Calculate final total amount after applying discount
  //         const finalTotalAmount = totalAmountWithGst.totalAmountWithGst - discountAmount;
  // console.log(finalTotalAmount,"finalTotalAmount")
  //         // Set values in the newOrder object
  //         newOrder.TotalAmount =  Math.round(finalTotalAmount);
  //         newOrder.Amount =totalAmountWithGst;
  //         newOrder.CGST = totalAmountWithGst.cgstAmount;
  //         newOrder.SGST = totalAmountWithGst.sgstAmount;
  //         newOrder.GSTAmount = totalAmountWithGst.totalGstAmount;
  //         newOrder.DiscountAmount =  Math.round(discountAmount);
  //         newOrder.totalAmountWithGst=totalAmountWithGst.totalAmountWithGst;
  //         newOrder.SubTotal=subTotal;
  //         await newOrder.save();

  //         // Return the required details
  //         return {
  //             newOrder,
  //             SubTotal: subTotal,
  //             DiscountAmount: Math.round(discountAmount),
  //             TotalAmount: Math.round(finalTotalAmount),
  //             totalAmountWithGst:totalAmountWithGst.totalAmountWithGst
  //         };

  //     } catch (error) {
  //         console.error("Error processing order:", error.message);
  //         throw error;
  //     }
  // },

  /* userOrder: async (data) => {
    if (!data) {
      throw new Error("No data received.");
    }
    console.log(data, "data");

    const {
      admin_id,
      org_id,
      table_id,
      employee_id,
      TableStatus,
      newDish,
      TableName,
      TableType,
      userorde_id,
      discountRate,
      OrderType, // New parameter to distinguish between Dine-In and Takeaway
    } = data;

    if (!newDish || !Array.isArray(newDish) || newDish.length === 0) {
      throw new Error("Missing required fields: newDishArray.");
    }

    for (let dish of newDish) {
      if (
        typeof dish.Price === "undefined" ||
        typeof dish.quantity === "undefined"
      ) {
        throw new Error(
          `Dish with ID ${dish.menu_Category_id} is missing price or quantity.`
        );
      }
    }

    try {
      const organization = await organizationModel.findById(org_id);
      if (!organization) {
        throw new Error("organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "Admin not found" };
      }

      const gst = await organizationModel.findById(org_id);
      if (!gst) {
        throw new Error("Organization GST not found.");
      }
      console.log(gst,"gst")

      for (let newDishArray of newDish) {
        const category = await menuCategoryModel.findById(
          newDishArray.menu_Category_id
        );
        if (!category) {
          throw new Error(
            `Category with ID ${newDishArray.menu_Category_id} not found.`
          );
        }
      }

      const existingOrder = await userOrderModel.findOne({ _id: userorde_id });
      const org = await organizationModel.findById(org_id);
      const previousKotNo = org.KOT_No;
      const previousBillNo = org.Bill_No;

      const KOT = await Calculation.generateKOT(previousKotNo);
      const Bill_No = await Calculation.generateBill(previousBillNo);
console.log(existingOrder)
      await organizationModel.findByIdAndUpdate(org_id, {
        KOT_No: KOT,
        Bill_No: Bill_No,
      });

      const subTotal = await Calculation.totalAmount(newDish);
console.log(subTotal)
      let totalAmountWithGst;
      if (OrderType === "Takeaway") {
        // Modify GST calculation for takeaway orders (if applicable)
        totalAmountWithGst = Calculation.calculateTotalWithGst(
          subTotal,
          "Takeaway",
          gst.Gst
        );
        console.log(totalAmountWithGst)
      } else if (OrderType === "Dine-In") {
        totalAmountWithGst = Calculation.calculateTotalWithGst(
          subTotal,
          TableType,
          gst.Gst
        );
        console.log(totalAmountWithGst)
      } else {
        throw new Error("Invalid OrderType. Must be 'Dine-In' or 'Takeaway'.");
      }

      // Parse discountRate
      let discountAmount = 0;
      if (
        discountRate &&
        typeof discountRate === "string" &&
        discountRate.includes("%")
      ) {
        const numericDiscount = parseFloat(discountRate.replace("%", ""));
        if (!isNaN(numericDiscount) && numericDiscount > 0) {
          discountAmount =
            totalAmountWithGst.totalAmountWithGst * (numericDiscount / 100);
            console.log(discountAmount)
        }
      }

      const finalTotalAmount =
        totalAmountWithGst.totalAmountWithGst - discountAmount;
      console.log(finalTotalAmount, "khg");
      const newOrderData = {
        OrderType,
        admin_id,
        org_id,
        userorde_id: existingOrder ? existingOrder._id : null,
        employee_id,
        status: "Processing",
        Dishes: newDish.map((dish) => ({
          ...dish,
          status: "Processing",
        })),
        KOT_No: KOT,
        Bill_No: Bill_No,
        old_Kot_no: existingOrder ? existingOrder.KOT_No : null,
        TotalAmount: Math.round(finalTotalAmount),
        CGST: totalAmountWithGst.cgstAmount,
        SGST: totalAmountWithGst.sgstAmount,
        GSTAmount: totalAmountWithGst.totalGstAmount,
        DiscountAmount: Math.round(discountAmount),
        totalAmountWithGst: totalAmountWithGst.totalAmountWithGst,
        SubTotal: subTotal,
      };
      console.log(OrderType, "OrderType");
      if (OrderType == "Dine-In") {
        console.log("heloo");
        newOrderData.table_id = table_id;
        newOrderData.TableStatus = TableStatus;
        newOrderData.TableName = TableName;
        newOrderData.TableType = TableType;
        console.log("weeee");
      }

      console.log("demo");
      const newOrder = await userOrderModel.create(newOrderData);
      console.log("hiii");

      const message = `New Order #${newOrder.KOT_No} for Table ${newOrder.TableName} is ready to cook. Please start preparation.`;

      // ✅ 1. Save in DB for notification list
      await notificationModel.create({
        title: "👨‍🍳 New Kitchen Order",
        message,
        type: "kitchen_order",
        admin_id,
        org_id,
      });
      if (admin?.fcmToken) {
        await notificationService.sendFcmToAdmin(admin.fcmToken, {
          title: "👨‍🍳 New Kitchen Order",
          body: message,
        });
      }

      await notificationService.sendNotifyToKitchen(org_id, {
        title: "👨‍🍳 New Kitchen Order",
        body: message,
      });
      return {
        newOrder,
        SubTotal: subTotal,
        DiscountAmount: Math.round(discountAmount),
        TotalAmount: Math.round(finalTotalAmount),
        totalAmountWithGst: totalAmountWithGst.totalAmountWithGst,
      };
    } catch (error) {
      console.error("Error processing order:", error.message);
      throw error;
    }
  }, */

  userOrder: async (data) => {
    if (!data) {
      throw new Error("No data received.");
    }
    console.log(data, "data");

    const {
      admin_id,
      org_id,
      table_id,
      employee_id,
      TableStatus,
      newDish,
      TableName,
      TableType,
      userorde_id,
      OrderType,
    } = data;

    if (!newDish || !Array.isArray(newDish) || newDish.length === 0) {
      throw new Error("Missing required fields: newDishArray.");
    }

    for (let dish of newDish) {
      if (
        typeof dish.Price === "undefined" ||
        typeof dish.quantity === "undefined"
      ) {
        throw new Error(
          `Dish with ID ${dish.menu_Category_id} is missing price or quantity.`
        );
      }
      // if (typeof dish.discount === "undefined") {
      //   throw new Error(
      //     `Dish with ID ${dish.menu_Category_id} is missing DiscountAmount.`
      //   );
      // }

      if (dish.discount === undefined || dish.discount === null || dish.discount === "") {
        dish.discount = 0;
      } else {
        dish.discount = Number(dish.discount);
        if (isNaN(dish.discount)) dish.discount = 0;
      } 
    }

    try {
      const organization = await organizationModel.findById(org_id);
      if (!organization) throw new Error("Organization not found");

      const admin = await registerModel.findById(admin_id);
      if (!admin) return { message: "Admin not found" };

      const gstRates = organization.Gst;

      for (let dish of newDish) {
        const category = await menuCategoryModel.findById(
          dish.menu_Category_id
        );
        if (!category) {
          throw new Error(
            `Category with ID ${dish.menu_Category_id} not found.`
          );
        }
      }

      const existingOrder = await userOrderModel.findById(userorde_id);
      const previousKotNo = organization.KOT_No;
      const previousBillNo = organization.Bill_No;

      const KOT = await Calculation.generateKOT(previousKotNo);
      const Bill_No = await Calculation.generateBill(previousBillNo);

      await organizationModel.findByIdAndUpdate(org_id, {
        KOT_No: KOT,
        Bill_No: Bill_No,
      });

      let subTotal = 0;
      let totalDiscountAmount = 0;

      const updatedDishes = newDish.map((dish) => {
        const itemTotal = dish.Price * dish.quantity; // price × qty
        const itemDiscount = itemTotal * (dish.discount / 100);

        subTotal += itemTotal;
        totalDiscountAmount += itemDiscount;

        return {
          ...dish,
          menuDiscountAmount: itemDiscount, // attach per dish
          status: "Processing",
        };
      });

      const taxableAmount = subTotal - totalDiscountAmount;

      let totalAmountWithGst;
      if (OrderType === "Takeaway") {
        totalAmountWithGst = Calculation.calculateTotalWithGst(
          taxableAmount,
          "Takeaway",
          gstRates
        );
      } else if (OrderType === "Dine-In") {
        totalAmountWithGst = Calculation.calculateTotalWithGst(
          taxableAmount,
          TableType,
          gstRates
        );
      } else {
        throw new Error("Invalid OrderType. Must be 'Dine-In' or 'Takeaway'.");
      }
      const newOrderData = {
        OrderType,
        admin_id,
        org_id,
        userorde_id: existingOrder ? existingOrder._id : null,
        employee_id,
        status: "Processing",
        Dishes: updatedDishes,
        KOT_No: KOT,
        Bill_No: Bill_No,
        old_Kot_no: existingOrder ? existingOrder.KOT_No : null,
        TotalAmount: taxableAmount,
        CGST: totalAmountWithGst.cgstAmount,
        SGST: totalAmountWithGst.sgstAmount,
        GSTAmount: totalAmountWithGst.totalGstAmount,
        DiscountAmount: totalDiscountAmount,
        totalAmountWithGst: totalAmountWithGst.totalAmountWithGst,
        SubTotal: subTotal,
      };

      if (OrderType === "Dine-In") {
        newOrderData.table_id = table_id;
        newOrderData.TableStatus = TableStatus;
        newOrderData.TableName = TableName;
        newOrderData.TableType = TableType;
      }

      const newOrder = await userOrderModel.create(newOrderData);
      return {
        newOrder,
        SubTotal: subTotal,
        DiscountAmount: totalDiscountAmount,
        TotalAmount: taxableAmount,
        totalAmountWithGst: totalAmountWithGst.totalAmountWithGst,
      };
    } catch (error) {
      console.error("Error processing order:", error.message);
      throw error;
    }
  },

  getAllOrder: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        return { message: "organization not found" };
      } 
      const userOrder = await userOrderModel
        .find({ org_id, TableStatus: "Blank" })
        .sort({ timestamp: -1 });
      return userOrder;
    } catch (error) {
      throw error;
    }
  },

  deleteUserOrder: async (data) => {

    const { org_id, userorder_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        return { message: "organization not found" };
      }
      const order = await userOrderModel.findOneAndDelete({
        _id: userorder_id,
        org_id,
      });
      if (!order) {
        throw new Error("order not found");
      }
      return order;
    } catch (error) {
      throw error;
    }
  },
  // ==================================================

  checkUserOrder: async (data) => {
    const { KOT_No, org_id } = data;
    try {
      const kotNumber =
        typeof KOT_No === "object" && KOT_No.KOT_No ? KOT_No.KOT_No : KOT_No;
      console.log(kotNumber, "KOTNO");

      const matchingKOTs = await userOrderModel.find({
        old_Kot_no: kotNumber,
        org_id,
      });
      console.log(matchingKOTs, "kkk");
      if (!matchingKOTs || matchingKOTs.length === 0) {
        console.log(`No KOT found for ${KOT_No}`);
        return null;
      }

      const userOrderUpdates = {};

      matchingKOTs.forEach((kot) => {
        if (!userOrderUpdates[kot.userorde_id]) {
          userOrderUpdates[kot.userorde_id] = {
            Dishes: [],
            totalAmount: 0,
            sgst: 0,
            cgst: 0,
            DiscountAmount: 0,
            SubTotal: 0,
            totalAmountWithGst: 0,
          };
        }

        userOrderUpdates[kot.userorde_id].totalAmount += kot.TotalAmount ?? 0;
        userOrderUpdates[kot.userorde_id].sgst += kot.SGST ?? 0;
        userOrderUpdates[kot.userorde_id].cgst += kot.CGST ?? 0;
        userOrderUpdates[kot.userorde_id].DiscountAmount +=
          kot.DiscountAmount ?? 0;
        userOrderUpdates[kot.userorde_id].SubTotal += kot.SubTotal ?? 0;
        userOrderUpdates[kot.userorde_id].totalAmountWithGst +=
          kot.totalAmountWithGst ?? 0;

        kot.Dishes.forEach((dish) => {
          if (dish.status === "Foodready") {
            userOrderUpdates[kot.userorde_id].Dishes.push(dish);
          }
        });
      });
      await userOrderModel.deleteMany({
        org_id,
        old_Kot_no: kotNumber,
        "Dishes.status": "Foodready",
      });

      const updatePromises = Object.entries(userOrderUpdates).map(
        async ([userordeId, updateData]) => {
          const gstAmount = updateData.sgst + updateData.cgst;

          return userOrderModel.findOneAndUpdate(
            { _id: userordeId },
            {
              $push: { Dishes: { $each: updateData.Dishes } },
              $inc: {
                TotalAmount: updateData.totalAmount,
                SGST: updateData.sgst,
                CGST: updateData.cgst,
                GSTAmount: gstAmount,
                SubTotal: updateData.SubTotal,
                DiscountAmount: updateData.DiscountAmount,
                totalAmountWithGst: updateData.totalAmountWithGst,
              },
            },
            { new: true }
          );
        }
      );

      const updatedOrders = await Promise.all(updatePromises);

      console.log("Updated Orders:", updatedOrders);
      return updatedOrders;
    } catch (error) {
      console.error("Error updating KOTs:", error);
      throw error;
    }
  },

  //===================================================
  updateStatus: async (data) => {
    const { admin_id, org_id, table_id, TableStatus } = data;
    if (!admin_id || !org_id) {
      throw new Error("both fields required");
    }
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        return { message: "organization not found" };
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      if (!TableStatus) {
        throw new Error("TableStatus is required");
      }

      console.log(TableStatus, "k");

      const statusColorData = await statusColorModel.findOne({
        statusName: TableStatus,
      });
      if (!statusColorData) {
        throw new Error("Status color not found");
      }

      const existingOrder = await RoomTableModel.findOne({ _id: table_id });
      if (!existingOrder) {
        throw new Error("Order not found for the specified table");
      }

      const updatedOrder = await RoomTableModel.findOneAndUpdate(
        { _id: table_id, "rooms.TableStatus": { $exists: true } },
        {
          $set: {
            "rooms.$.TableStatus": TableStatus,
            statusColor: statusColorData.statusColor,
          },
        },
        { new: true }
      );

      if (!updatedOrder) {
        throw new Error("Order update failed");
      }

      return {
        updatedStatus: updatedOrder,
        statusColor: statusColorData.statusColor,
      };
    } catch (error) {
      console.error("Error updating status:", error.message);
      throw error;
    }
  },

  //=========================================================
  getUserorder: async (data) => {
    const { admin_id, org_id, table_id } = data;
    console.log(table_id);
    if (!admin_id || !org_id || !table_id) {
      throw new Error("both fields required");
    }
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        return { message: "organization not found" };
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const userOrder = await userOrderModel.find({
        table_id: String(table_id),
        TableStatus: { $ne: "Blank" },
      });
      console.log(userOrder, "kk");

      if (!userOrder || userOrder.length === 0) {
        return { message: "Order not found." };
      }

      return userOrder;
    } catch (error) {
      console.error("Error retrieving user order:", error);

      return res
        .status(500)
        .json({ message: `Failed to retrieve user order: ${error.message}` });
    }
  },

  //===========================================
  removeDishbyTableId: async (data) => {
    const { admin_id, org_id, _id, table_id } = data;
    console.log(data);
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const result = await userOrderModel.updateOne(
        { table_id: table_id },
        { $pull: { Dishes: { _id: _id } } }
      );

      if (result.modifiedCount === 0) {
        return { message: "No dish found or already deleted." };
      }

      return { message: "Dish removed successfully.", result };
    } catch (error) {
      throw error;
    }
  },

  //==================================================
  getuserorderTable: async (admin_id, org_id, table_id) => {
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const userOrder = await userOrderModel.find({
        table_id: String(table_id),
      });

      console.log(userOrder);
      return userOrder;
    } catch (error) {
      console.error("Error retrieving user order:", error);
      throw new Error(`Failed to retrieve user order: ${error.message}`);
    }
  },
  //===============================================
  /*  updateQuantity: async (data) => {
    const { admin_id, org_id, userorder_id, menu_item_id, quantity } = data;

    try {
      if (
        !admin_id ||
        !org_id ||
        !userorder_id ||
        !menu_item_id ||
        quantity === undefined
      ) {
        throw new Error("Missing required parameters");
      }
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      console.log(`Menu Item ID: ${menu_item_id}, Quantity: ${quantity}`);

      const user = await userOrderModel.findById(userorder_id);
      console.log(user, "Fetched user order");

      if (!user) {
        throw new Error("Order not found");
      }
      const updateIdQuantity = await userOrderModel.findOneAndUpdate(
        {
          _id: userorder_id,
          "Dishes.menu_item_id": menu_item_id,
          org_id,
        },
        { $set: { "Dishes.$.quantity": quantity } },
        { new: true }
      );

      if (!updateIdQuantity) {
        console.log("No order found or dish ID is invalid.");
        return { message: "No order found or dish ID is invalid." };
      }

      console.log("Updated successfully:", updateIdQuantity);
      return updateIdQuantity; // Return the updated order
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  }, */

  updateQuantity: async (data) => {
    const { admin_id, org_id, menu_item_id, quantity } = data;

    try {
      if (!admin_id || !org_id || !menu_item_id || quantity === undefined) {
        throw new Error("Missing required parameters");
      }
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      console.log(`Menu Item ID: ${menu_item_id}, Quantity: ${quantity}`);

      // const user = await userOrderModel.findById(userorder_id);
      // console.log(user, "Fetched user order");

      // if (!user) {
      //   throw new Error("Order not found");
      // }
      const updateIdQuantity = await userOrderModel.findOneAndUpdate(
        {
          // _id: userorder_id,
          "Dishes.menu_item_id": menu_item_id,
          org_id,
        },
        { $set: { "Dishes.$.quantity": quantity } },
        { new: true }
      );

      if (!updateIdQuantity) {
        console.log("No order found or dish ID is invalid.");
        return { message: "No order found or dish ID is invalid." };
      }

      console.log("Updated successfully:", updateIdQuantity);
      return updateIdQuantity; // Return the updated order
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  },
  //================================
  getallUser: async () => {
    try {
      const overallUser = await userModel.find();
      return overallUser;
    } catch (error) {
      throw error;
    }
  },
};

export default tableService;
