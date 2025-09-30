// import accountModel from "../../model/Account/accountModel.js";

// const accountService = {
//     async saveBillService(accountData) {
//         try {
//             const newAccount = new accountModel({
//                 bill_no: accountData.bill_no,
//                 table_no: accountData.table_no,
//                 date: accountData.date,
//                 time: accountData.time,
//                 customerName: accountData.customerName,
//                 phoneNumber: accountData.phoneNumber,
//                 paymentMode: accountData.paymentMode,
//                 amount: accountData.amount,
//                 status: accountData.status,
//                 discount: accountData.discount || 0,
//                 amountReceived: accountData.amountReceived,
//                 change: accountData.change || 0,
//                 parcelCharge: accountData.parcelCharge || 0,
//                 subTotal: accountData.subTotal,
//                 grandTotal: accountData.grandTotal,
//                 phoneNumber: accountData.phoneNumber,
//                 table_id: accountData.table_id,
//                 Admin_id: accountData.Admin_id,
//                 org_id: accountData.org_id,
//             });
//             return await newAccount.save();
//         } catch (error) {
//             throw new Error(`Error creating account: ${error.message}`);
//         }
//     },

//     async getAllsavedBillsService() {
//         try {
//             return await accountModel.find({});
//         } catch (error) {
//             throw new Error(`Error fetching accounts: ${error.message}`);
//         }
//     },
//     async getBillsByMonthService(startDate, endDate) {
//         try {
//             const startString = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
//             const endString = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;

//             return await accountModel.find({
//                 date: {
//                     $gte: startString,
//                     $lte: endString,
//                 },
//             });
//         } catch (error) {
//             throw new Error(`Error fetching bills by month: ${error.message}`);
//         }
//     },
//     async deleteBillByIdService(id) {
//         try {
//             const deletedBill = await accountModel.findByIdAndDelete(id);
//             return deletedBill;
//         } catch (error) {
//             throw new Error(`Error deleting bill: ${error.message}`);
//         }
//     },
//     async deleteBillsByIdsService(ids) {
//         try {
//             const deletedBills = await accountModel.deleteMany({
//                 _id: {
//                     $in: ids
//                 },
//             });
//             return deletedBills;
//         } catch (error) {
//             throw new Error(`Error deleting bills: ${error.message}`);
//         }
//     },
//     async getBillsByDateService(date) {
//         try {
//             const inputDate = new Date(date);
//             const formattedDate = inputDate.toLocaleDateString('en-GB');
//             return await accountModel.find({
//                 date: formattedDate
//             });
//         } catch (error) {
//             throw new Error(`Error fetching bills by date: ${error.message}`);
//         }
//     },

//     async getBillsByWeekService(startDate) {
//         try {
//             const start = new Date(startDate);
//             const end = new Date(start);
//             end.setDate(start.getDate() + 6);
//             const formatDate = (date) => {
//                 const day = String(date.getDate()).padStart(2, '0');
//                 const month = String(date.getMonth() + 1).padStart(2, '0');
//                 const year = date.getFullYear();
//                 return `${day}/${month}/${year}`;
//             };

//             const startStr = formatDate(start);
//             const endStr = formatDate(end);
//             console.log("Start Date String: ", startStr);
//             console.log("End Date String: ", endStr);
//             return await accountModel.find({
//                 date: {
//                     $gte: startStr,
//                     $lte: endStr
//                 }
//             });
//         } catch (error) {
//             throw new Error(`Error fetching bills by week: ${error.message}`);
//         }
//     }

// }
// export default accountService;

import Calculation from "../../../Calculation.js";
import accountModel from "../../model/Account/accountModel.js";
import userOrderModel from "../../model/userOrderModel.js";
import customerModel from "../../model/customerModel.js";
import organizationModel from "../../model/organizationModel.js";
import salesReportModel from "../../model/salesReportModel.js";
import salesService from "../salesService.js";
import notificationService from "../notificationService.js";
import notificationModel from "../../model/notificationModel.js";
import registerModel from "../../model/registerModel.js";

const accountService = {
  getCusName: async (data) => {
    const { ContactNo } = data;
    try {
      const customer = await customerModel.findOne({ ContactNo });
      if (customer) {
        return {
          ContactNo: customer.ContactNo,
          customerName: customer.CustomerName || "",
        };
      } else {
        return {
          customerName: "",
        };
      }
    } catch (error) {
      console.log(object)(`Error creating account: ${error.message}`);
      throw error;
    }
  },

  saveBillService: async (accountData) => {
    console.log(accountData);
    const {
      userOrder_id,
      table_no,
      Bill_No,
      table_id,
      date,
      time,
      ContactNo,
      customerName,
      paymentMode,
      amount,
      status,
      discount,
      amountReceived,
      change,
      parcelCharge,
      subTotal,
      grandTotal,
      admin_id,
      org_id,
    } = accountData;

    console.log("Received accountData:", accountData);

    try {
      console.log("Received org_id:", org_id,typeof org_id);
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      let finalCustomerName = customerName;
      if (ContactNo) {
        const customerData = await salesService.createCustomer({
          admin_id,
          org_id,
          CustomerId: "",
          CustomerName: customerName,
          Address: "",
          DateOfBirth: "",
          EmailId: "",
          ContactNo,
          Date: new Date(),
          status: "Active",
        });

        finalCustomerName = customerData.CustomerName || customerName;
      }

      const newAccount = new accountModel({
        userOrder_id,
        table_no,
        Bill_No,
        table_id,
        date,
        time,
        ContactNo: ContactNo || "",
        customerName: finalCustomerName,
        paymentMode,
        amount,
        status,
        discount: discount || 0,
        amountReceived,
        change: change || 0,
        parcelCharge: parcelCharge || 0,
        subTotal,
        grandTotal,
        admin_id,
        org_id,
      });

      const message = `Order #${newAccount.Bill_No} has been forwarded to Accounts for billing.`;

      // ✅ 1. Save in DB for notification list
      await notificationModel.create({
        title: "🧾 Order Billed",
        message,
        type: "bill",
        admin_id,
        org_id,
      });
console.log("Sending notification with org_id:", org_id);

      await notificationService.sendFcmToAdmin(org_id, {
        title: "🧾 Order Billed",
        body: message,
      });
      
    /* 
      await notificationService.sendNotifyToAccounts(org_id, {
        title: "🧾 Order Billed",
        body: message,
      }); */

      return await newAccount.save();
    } catch (error) {
      console.log(`Error creating account: ${error.message}`);
      throw error;
    }
  },
    /* if (admin?.fcmToken) {
        await notificationService.sendFcmToAdmin(admin.fcmToken, {
          title: "🧾 Order Billed",
          body: message,
        });
      } */

  getBillsByDateService: async (data) => {
    const { org_id, date } = data;
    console.log(date, "dte");
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      console.log(date, "dte");
      const dayBill = await accountModel
        .find({
          org_id,
          date: date,
        })
        .sort({ timestamp: -1 });
      return dayBill;
    } catch (error) {
      console.log(`Error fetching bills by date: ${error.message}`);
      throw error;
    }
  },

  async getAllsavedBillsService() {
    try {
      return await accountModel.find({});
    } catch (error) {
      throw new Error(`Error fetching accounts: ${error.message}`);
    }
  },

  getAllsavedBillsBymonth: async (org_id, startDate, endDate) => {
    console.log(org_id, startDate, endDate);
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      console.log(`Fetching bills from ${startDate} to ${endDate}`);
      const utcStartDate = new Date(startDate).toISOString();
      const utcEndDate = new Date(endDate).toISOString();

      console.log(`UTC Start: ${utcStartDate}, UTC End: ${utcEndDate}`);

      const bills = await accountModel
        .find({
          org_id,
          date: {
            $gte: utcStartDate,
            $lte: utcEndDate,
          },
        })
        .sort({ timestamp: -1 });

      console.log(bills, "lo");
      return bills;
    } catch (error) {
      console.error(
        `Error in getAllsavedBillsBymonth service: ${error.message}`
      );
      throw new Error(`Error fetching bills: ${error.message}`);
    }
  },

  async deleteBillByIdService(id) {
    try {
      const deletedBill = await accountModel.findByIdAndDelete(id);
      return deletedBill;
    } catch (error) {
      throw new Error(`Error deleting bill: ${error.message}`);
    }
  },

  async deleteBillsByIdsService(_id) {
    try {
      const deletedBills = await accountModel.deleteMany({
        _id: {
          $in: _id,
        },
      });
      return deletedBills;
    } catch (error) {
      throw new Error(`Error deleting bills: ${error.message}`);
    }
  },

  async getBillsByWeekService(org_id, startDate) {
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      // Parse the input date
      const start = new Date(startDate);
      if (isNaN(start)) {
        throw new Error("Invalid start date provided.");
      }

      // Set the start date to the beginning of the day
      start.setHours(0, 0, 0, 0);

      // Calculate the end date (6 days later)
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      // Helper function to format dates as YYYY-MM-DD
      const formatDate = (date) => {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${y}-${m}-${d}`;
      };

      // Format the date range
      const dateRange = [formatDate(start), formatDate(end)];
      console.log(`Date Range: ${JSON.stringify(dateRange)}`);

      // Query the database for bills within the date range
      const bills = await accountModel.find({
        org_id,
        timestamp: {
          $gte: start, // Use the actual Date objects for the query
          $lte: end,
        },
      });
      // console.log(`Fetched Bills: ${JSON.stringify(bills)}`);

      return bills;
    } catch (error) {
      throw new Error(`Error fetching bills by week: ${error.message}`);
    }
  },

  // ==========================
  getBillsByYearService: async (year) => {
    try {
      // Start and end of the year
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      // Fetch bills within the year
      const yearBills = await accountModel.find({
        date: { $gte: startDate.toISOString(), $lte: endDate.toISOString() },
      });

      if (yearBills.length === 0) {
        throw new Error(`No bills found for the year ${year}`);
      }
      return yearBills;
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching bills by year: ${error.message}`);
    }
  },
  // ======
  updateBillStatus: async (data) => {
    const { bill_id, status, paymentMode, ContactNo } = data;
    console.log(data);
    try {
      const updateBillStatus = await accountModel.findByIdAndUpdate(
        bill_id,
        {
          status,
          paymentMode,
          ContactNo,
        },
        { new: true }
      );
      return updateBillStatus;
    } catch (error) {
      throw error;
    }
  },

  // ==================

  saveBillFilter: async (customerName, ContactNo) => {
    try {
      const filter = {};

      if (customerName) {
        filter.customerName = customerName;
        console.log("Fetching by customerName:", filter.customerName);
      }
      if (ContactNo) {
        filter.ContactNo = ContactNo;
        console.log("Fetching by ContactNo:", filter.ContactNo);
      }
      let overAllcustomers;
      if (Object.keys(filter).length > 0) {
        overAllcustomers = await accountModel.find(filter);
        console.log("Filtered customers:", overAllcustomers);
      } else {
        overAllcustomers = await accountModel.find();
        console.log("All customers:", overAllcustomers);
      }
      return overAllcustomers;
    } catch (error) {
      throw new Error("Error fetching customers: " + error.message);
    }
  },

  //======================================================================

  selectTablename: async (data) => {
    if (!data) {
      throw new Error("No data received.");
    }
    const { TableName } = data;
    if (!TableName) {
      throw new Error("TableName is required.");
    }
    try {
      const order = await userOrderModel
        .findOne({
          TableName,
        })
        .populate("Dishes.menu_item_id");
      if (!order) {
        return {
          message: ` No order found for TableName: ${TableName}`,
        };
      }
      let totalAmount = 0;
      const output = order.Dishes.map((dish) => {
        const dishPrice = dish.Price * dish.quantity;
        totalAmount += dishPrice;
        return {
          menuName: dish.menuName,
          qty: dish.quantity,
          rate: dish.Price,
          Price: dishPrice,
          TableType: order.TableType,
          TableName: order.TableName,
        };
      });
      const gstAmount = order.SGST + order.CGST;
      totalAmount += gstAmount;
      return {
        message: "get table name",
        data: {
          orderDetails: output,
          TotalAmount: totalAmount,
          SGST: order.SGST,
          CGST: order.CGST,
          GSTAmount: gstAmount,
        },
      };
    } catch (error) {
      console.error("Error processing order:", error.message);
      throw error;
    }
  },
  //===================================================================
  dineinBill: async (data) => {
    if (!data) {
      throw new Error("No data received.");
    }

    const { tableName, cash = 0 } = data; // Default cash to 0 if not provided

    if (!tableName) {
      throw new Error("Missing tableName.");
    }

    try {
      // Generate a unique bill number
      let bill_no = "EB0001"; // Default for the first bill

      const lastBill = await accountModel
        .findOne()
        .sort({ bill_no: -1 })
        .exec();
      if (lastBill && lastBill.bill_no) {
        const lastNumberStr = lastBill.bill_no.slice(2); // Remove "EB"
        const lastNumber = parseInt(lastNumberStr, 10);

        if (!isNaN(lastNumber)) {
          // Increment and pad with leading zeros
          bill_no = `EB${(lastNumber + 1).toString().padStart(4, "0")}`;
        }
      }

      // Fetch running orders for the given table
      const orders = await userOrderModel.find({
        TableName: tableName,
        TableStatus: "Running",
      });

      if (orders.length === 0) {
        throw new Error(`No running orders found for table ${tableName}.`);
      }

      // Consolidate dishes and calculate amounts
      const consolidatedDishesMap = {};
      let totalAmount = 0;
      let gstAmount = 0;
      let totalQuantity = 0;
      let tableType = "";

      orders.forEach((order) => {
        tableType = order.TableType; // Assuming consistency across orders
        order.Dishes.forEach((dish) => {
          const { menuName, Price, quantity } = dish;
          const dishTotalAmount = Price * quantity;

          if (consolidatedDishesMap[menuName]) {
            consolidatedDishesMap[menuName].quantity += quantity;
            consolidatedDishesMap[menuName].Amount += dishTotalAmount;
          } else {
            consolidatedDishesMap[menuName] = {
              menuName,
              quantity,
              price: Price,
              Amount: dishTotalAmount,
            };
          }

          totalQuantity += quantity;
          totalAmount += dishTotalAmount;
        });

        gstAmount += order.GSTAmount || 0;
      });

      // Calculate GST and totals
      const sgstAmount = gstAmount / 2;
      const cgstAmount = gstAmount / 2;
      const finalTotalAmount = totalAmount + gstAmount;

      let change = 0;
      if (cash > 0) {
        change = cash - finalTotalAmount;

        if (change < 0) {
          throw new Error(
            ` Insufficient cash provided. Required: ${finalTotalAmount}, Received: ${cash}`
          );
        }
      }

      const consolidatedDishes = Object.values(consolidatedDishesMap);

      // Prepare bill details
      const billDetails = {
        TableName: tableName,
        TableType: tableType,
        TotalQuantity: totalQuantity,
        TotalAmount: totalAmount,
        SGSTAmount: sgstAmount,
        CGSTAmount: cgstAmount,
        GSTAmount: gstAmount,
        GrandTotal: finalTotalAmount,
        Dishes: consolidatedDishes,
        bill_no: bill_no,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
        Cash: cash,
        Change: change,
      };

      // Save the bill record in the account model
      const saveData = {
        table_no: billDetails.TableName,
        table_type: billDetails.TableType,
        total_quantity: billDetails.TotalQuantity,
        total_amount: billDetails.TotalAmount,
        sgst_amount: billDetails.SGSTAmount,
        cgst_amount: billDetails.CGSTAmount,
        gst_amount: billDetails.GSTAmount,
        grand_total: billDetails.GrandTotal,
        dishes: billDetails.Dishes,
        bill_no: billDetails.bill_no,
        date: billDetails.date,
        time: billDetails.time,
        cash: billDetails.Cash,
        change: billDetails.Change,
        bill_status: "tables",
        timestamp: new Date(),
      };

      await accountModel.create(saveData);

      // Return a clean and meaningful response
      return {
        message: "User orders fetched and bill generated successfully",
        data: billDetails,
      };
    } catch (error) {
      console.error("Error processing dine-in bill:", error.message);
      throw error;
    }
  },
  //: ==============
  updateOrderStatus: async (data) => {
    console.log(data);

    const { userOrder_id, TableStatus } = data;
    try {
      const update = await userOrderModel.findByIdAndUpdate(
        userOrder_id,
        { TableStatus },
        { new: true }
      );
      console.log("gghghjg", update);

      return update;
    } catch (error) {
      throw error;
    }
  },
};
export default accountService;
