import orderModel from "../model/orderModel.js";
import orderItemModel from "../model/orderItemModel.js";
import customerModel from "../model/customerModel.js";
import paymentModel from "../model/paymentModel.js";
import receiptsModel from "../model/receiptsModel.js";
import salesReportModel from "../model/salesReportModel.js";
import loyaltyProgramsModel from "../model/loyaltyProgramsModel.js";
import employeeModel from "../model/userRegModel.js";
import scheduleModel from "../model/scheduleModel.js";
import TimeOffRequestsModel from "../model/TimeOffRequestsModel.js";
import TasksModel from "../model/TasksModel.js";
import userRegModel from "../model/userRegModel.js";
import userModel from "../model/userModel.js";
import registerModel from "../model/registerModel.js";
import organizationModel from "../model/organizationModel.js";
import bcrypt from "bcrypt";
import notificationModel from "../model/notificationModel.js";
import notificationService from "./notificationService.js";
const salesService = {
  ordersCretaed: async (data) => {
    const {
      admin_id,
      org_id,
      order_id,
      customer_id,
      order_status,
      total_amount,
      payment_method,
    } = data;
    try {
      const createOrder = await orderModel.create({
        admin_id,
        org_id,
        order_id,
        customer_id,
        order_status,
        total_amount,
        payment_method,
      });
      return createOrder;
    } catch (error) {
      throw error;
    }
  },
  //==============================================
  getOrder: async (admin_id, org_id, Order_id) => {
    try {
      const getIdOrders = await orderModel.findById(Order_id);
      return getIdOrders;
    } catch (error) {
      throw error;
    }
  },
  //=============================================
  updateOrder: async (data) => {
    const {
      admin_id,
      org_id,
      Order_id,
      order_id,
      customer_id,
      order_status,
      total_amount,
      payment_method,
    } = data;
    try {
      const updateOnlyId = await orderModel.findByIdAndUpdate(
        Order_id,
        {
          Order_id,
          order_id,
          customer_id,
          order_status,
          total_amount,
          payment_method,
        },
        { new: true }
      );
      return updateOnlyId;
    } catch (error) {
      throw new error();
    }
  },
  //==================================================
  createOrderitem: async (data) => {
    const {
      admin_id,
      org_id,
      order_item_id,
      order_id,
      product_id,
      quantity,
      price,
    } = data;
    try {
      const createOrderItem = await orderItemModel.create({
        admin_id,
        org_id,
        order_item_id,
        order_id,
        product_id,
        quantity,
        price,
      });
      return createOrderItem;
    } catch (error) {
      throw error;
    }
  },
  //====================================================
  getOrderItems: async (admin_id, org_id, Order_Item_id) => {
    try {
      const getIdOrderItem = await orderItemModel.findById(Order_Item_id);
      return getIdOrderItem;
    } catch (error) {
      throw error;
    }
  },
  //================================================
  updateOrderItems: async (data) => {
    const {
      admin_id,
      org_id,
      Order_Item_id,
      order_item_id,
      order_id,
      product_id,
      quantity,
      price,
    } = data;
    try {
      const updateOnlyId = await orderItemModel.findByIdAndUpdate(
        Order_Item_id,
        {
          order_item_id,
          order_id,
          product_id,
          quantity,
          price,
        },
        { new: true }
      );
      return updateOnlyId;
    } catch (error) {
      throw new error();
    }
  },
  //=====================================
  /*  createCustomer: async (data) => {
    const {
      admin_id,
      org_id,
      CustomerId,
      CustomerName,
      Address,
      status,
      DateOfBirth,
      EmailId,
      ContactNo,
      Date,
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
      const existingCustomer = await customerModel.findOne({
        org_id,
        ContactNo,
      });

      if (existingCustomer) {
        existingCustomer.cust_status = "Old";
        await existingCustomer.save();
        return existingCustomer;
      } else {
        const customerDetail = await customerModel.create({
          admin_id,
          org_id,
          CustomerId,
          CustomerName,
          Address,
          DateOfBirth,
          EmailId,
          cust_status: "New",
          ContactNo,
          Date,
          status,
        });

        return customerDetail;
      }
    } catch (error) {
      console.error("Error processing customer:", error);
      throw error;
    }
  }, */

  createCustomer: async (data) => {
    const {
      admin_id,
      org_id,
      CustomerId,
      CustomerName,
      Address,
      status,
      DateOfBirth,
      EmailId,
      ContactNo,
      Date,
    } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Room not found for this organization");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const existingCustomer = await customerModel.findOne({
        org_id,
        ContactNo,
      });

      if (existingCustomer) {
        existingCustomer.cust_status = "Old";
        await existingCustomer.save();
        // throw new Error("Contact number already exists");
        return existingCustomer;
      } else {
        const customerDetail = await customerModel.create({
          admin_id,
          org_id,
          CustomerId,
          CustomerName,
          Address,
          DateOfBirth,
          EmailId,
          cust_status: "New",
          ContactNo,
          Date,
          status,
        });

        const message = `${CustomerName} has been added as a new customer.`;
        await notificationModel.create({
          title: "🧑‍💼 New Customer Created",
          message,
          type: "customer",
          admin_id,
          org_id,
        });

        await notificationService.sendFcmToAdmin(org_id, {
                title: "🧑‍💼 New Customer Created",
                body: message,
              });

        /* if (admin.fcmToken) {
          await notificationService.sendFcmToAdmin(admin.fcmToken, {
            title: "🧑‍💼 New Customer Created",
            body: message,
          });
        } */

        return customerDetail;
      }
    } catch (error) {
      console.error("Error processing customer:", error);
      throw error;
    }
  },

  //=============================================
  getCustomers: async (customer_id) => {
    try {
      const getIdCustomer = await customerModel.findById(customer_id);
      return getIdCustomer;
    } catch (error) {
      throw error;
    }
  },
  //================================================
  updateCustomers: async (data) => {
    const {
      admin_id,
      org_id,
      customer_id,
      CustomerId,
      CustomerName,
      Address,
      DateOfBirth,
      EmailId,
      ContactNo,
      Date,
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
      const customer = await customerModel.findOne({ _id: customer_id });
      if (!customer) {
        throw new Error("customer not found");
      }
      const updateOnlyId = await customerModel.findByIdAndUpdate(
        customer_id,
        {
          // admin_id,
          // org_id,
          CustomerId,
          CustomerName,
          Address,
          DateOfBirth,
          EmailId,
          ContactNo,
          Date,
        },
        { new: true }
      );
      return updateOnlyId;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  getAllcustomers: async (org_id, CustomerName, ContactNo) => {
    try {
      const filter = { org_id };

      if (CustomerName) {
        filter.CustomerName = CustomerName;
        console.log("Fetching by CustomerName:", filter.CustomerName);
      }
      if (ContactNo) {
        filter.ContactNo = ContactNo;
        console.log("Fetching by ContactNo:", filter.ContactNo);
      }

      let overAllcustomers;

      if (Object.keys(filter).length > 0) {
        overAllcustomers = await customerModel.find(filter);
        console.log("Filtered customers:", overAllcustomers);
      } else {
        overAllcustomers = await customerModel.find({ org_id });
        console.log("All customers:", overAllcustomers);
      }

      return overAllcustomers;
    } catch (error) {
      throw new Error("Error fetching customers: " + error.message);
    }
  },
  // ------------------
  deleteCustomer: async (data) => {
    const { customer_id, org_id } = data;
    try {
      const deletedCustomer = await customerModel.findOneAndDelete({
        org_id,
        _id: customer_id,
      });

      if (!deletedCustomer) {
        throw new Error("Customer not found");
      }

      return deletedCustomer;
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  },

  // =====================
  onlineRegister: async (data) => {
    const { admin_id, org_id, CustomerId, CustomerName, ContactNo } = data;
    try {
      const registerOnline = await customerModel.create({
        admin_id,
        org_id,
        CustomerId,
        CustomerName,
        ContactNo,
        online: true,
      });
      return registerOnline;
    } catch (error) {
      throw error;
    }
  },
  // ======================
  createUser: async (data) => {
    const {
      admin_id,
      org_id,
      applogo_id,
      employee_Name,
      role,
      EmailId,
      Userstatus,
      Tables,
      ContactNo,
      RegDate,
      AccountNo,
      IFSCcode,
      BranchName,
      PANnumber,
    } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const custoersDetail = await userModel.create({
        admin_id,
        org_id,
        applogo_id,
        employee_Name,
        Tables,
        role,
        EmailId,
        Userstatus,
        ContactNo,
        RegDate,
        AccountNo,
        IFSCcode,
        BranchName,
        PANnumber,
      });
      const userdetails = await userRegModel.findOneAndUpdate(
        { EmailId, org_id },
        { userDetails_id: custoersDetail._id },
        { new: true }
      );
      return { custoersDetail, userdetails };
    } catch (error) {
      throw error;
    }
  },

  /*  createUser: async (data) => {
    const {
      admin_id,
      org_id,
      applogo_id,
      employee_Name,
      role,
      EmailId,
      password,
      Userstatus,
      Tables,
      ContactNo,
      RegDate,
      AccountNo,
      IFSCcode,
      BranchName,
      PANnumber,
    } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const existUser = await userModel.findOne({ org_id, EmailId });
      if (existUser) {
        throw new Error("email already exist");
      }

      const orgUserCount = await userModel.countDocuments({ org_id });

      // Generate emp_id like: EMP-ORG123-001
      const empNumber = String(orgUserCount + 1).padStart(3, "0");
      const emp_id = `EMP-${empNumber}`;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userDetail = await userModel.create({
        admin_id,
        org_id,
        applogo_id,
        employee_Name,
        Tables,
        role,
        EmailId,
        emp_id,
        password: hashedPassword,
        Userstatus,
        ContactNo,
        RegDate,
        AccountNo,
        IFSCcode,
        BranchName,
        PANnumber,
      });
      return userDetail;
    } catch (error) {
      throw error;
    }
  }, */

  //   ==================
  /* updateUser: async (data) => {
    const {
      userDetails_id,
      admin_id,
      org_id,
      employee_Name,
      EmailId,
      role,
      Userstatus,
      Tables,
      ContactNo,
      RegDate,
      AccountNo,
      IFSCcode,
      BranchName,
      PANnumber,
    } = data;
    console.log(data, "data");
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const existUser = await userModel.findOne({
        _id: userDetails_id,
        org_id,
      });
      if (!existUser) {
        throw new Error("user not found");
      }
      const updateUserId = await userModel.findOneAndUpdate(
        { _id: userDetails_id, org_id },
        {
          employee_Name,
          role,
          Userstatus,
          Tables,
          ContactNo,
          RegDate,
          AccountNo,
          IFSCcode,
          BranchName,
          PANnumber,
        },
        { new: true }
      );
      console.log(updateUserId, "v");
      return updateUserId;
    } catch (error) {
      throw error;
    }
  }, */

  updateUser: async (data) => {
    const {
      userReg_id,
      admin_id,
      org_id,
      emp_name,
      Userstatus,
      Tables,
      ContactNo,
      AccountNo,
      IFSCcode,
      BranchName,
      PANnumber,
    } = data;
    console.log(data, "data");
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const existUser = await userRegModel.findOne({
        _id: userReg_id,
        org_id,
      });
      if (!existUser) {
        throw new Error("user not found");
      }
      const updateUserId = await userRegModel.findOneAndUpdate(
        { _id: userReg_id, org_id },
        {
          emp_name,
          Userstatus,
          Tables,
          ContactNo,
          AccountNo,
          IFSCcode,
          BranchName,
          PANnumber,
        },
        { new: true }
      );
      console.log(updateUserId, "v");
      return updateUserId;
    } catch (error) {
      throw error;
    }
  },
  // =================
  /* deleteUserId: async (data) => {
    const { userDetails_id, org_id } = data;
    try {
      const deletedUser = await userModel.findOneAndDelete({
        _id: userDetails_id,
        org_id,
      });

      if (!deletedUser) {
        throw new Error("employee not found");
      }

      return deletedUser;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }, */

/*   deleteUserId: async (data) => {
    const { userReg_id, org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      const deletedUser = await userRegModel.findOneAndDelete({
        _id: userReg_id,
        org_id,
      });

      if (!deletedUser) {
        throw new Error("employee not found");
      }

      return deletedUser;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }, */
  deleteUserId: async (data) => {
    const { userReg_id, org_id, admin_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      if (admin_id) {
        const admin = await registerModel.findOne({ _id: admin_id, org_id });
        if (!admin) {
          throw new Error("Admin not found");
        }
        throw new Error("Admin cannot be deleted");
      }
      if (userReg_id) {
        const deletedUser = await userRegModel.findOneAndDelete({
          _id: userReg_id,
          org_id,
        });

        if (!deletedUser) {
          throw new Error("employee not found");
        }

        return deletedUser;
      }
      return {
        success: false,
        message: "Either userReg_id or admin_id is required",
      };
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
  // ================
  /* getallUser: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const overallData = await userModel.find({ org_id });
      console.log(overallData, "kj");
      return overallData;
    } catch (error) {
      throw error;
    }
  }, */
  getallUser: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findOne({ org_id });
      const overallData = await userRegModel.find({ org_id });
      console.log(overallData, "kj");
      const count = overallData.length + (admin ? 1 : 0);
      return {
        count,
        overallData,
        admin: {
          admin_id:admin._id.toString(),
          emp_name: admin.userName,
          role: "admin",
          EmailId: admin.email,
          ContactNo: admin.mobileNo,
        },
      };
    } catch (error) {
      throw error;
    }
  },
  //=======================================
  getSingleUser: async (data) => {
    const { org_id, userReg_id, admin_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }
      if (userReg_id) {
        const user = await userRegModel.findOne({ org_id, _id: userReg_id });
        if (!user) {
          throw new Error("user not found");
        }
        return user;
      }
      if (admin_id) {
        const admin = await registerModel.findOne({ org_id, _id: admin_id });
        if (!admin) {
          throw new Error("admin not found");
        }
        return {
            admin_id:admin._id.toString(),
          emp_name: admin.userName,
          role: "admin",
          EmailId: admin.email,
          ContactNo: admin.mobileNo,
        };
      }
    } catch (error) {
      throw error;
    }
  },
  //=======================================
  createPayments: async (data) => {
    const {
      admin_id,
      org_id,
      payment_id,
      order_id,
      payment_amount,
      payment_status,
      payment_date,
    } = data;
    try {
      const createPayment = await paymentModel.create({
        admin_id,
        org_id,
        payment_id,
        order_id,
        payment_amount,
        payment_status,
        payment_date,
      });
      return createPayment;
    } catch (error) {
      throw error;
    }
  },
  //==================================================
  getPayments: async (Payment_id, admin_id, org_id) => {
    try {
      const getIdPayment = await paymentModel.findById(Payment_id);
      return getIdPayment;
    } catch (error) {
      throw error;
    }
  },
  //=============================================
  createReceipts: async (data) => {
    const {
      admin_id,
      org_id,
      receipt_id,
      order_id,
      receipt_type,
      receipt_date,
      receipt_data,
    } = data;
    try {
      const createReceipts = await receiptsModel.create({
        admin_id,
        org_id,
        receipt_id,
        order_id,
        receipt_type,
        receipt_date,
        receipt_data,
      });
      return createReceipts;
    } catch (error) {
      throw error;
    }
  },
  //===================================
  getReceipts: async (receipts_id, admin_id, org_id) => {
    try {
      const getIdReceipts = await receiptsModel.findById(receipts_id);
      return getIdReceipts;
    } catch (error) {
      throw error;
    }
  },
  //=================================
  salesReportsCreate: async (data) => {
    const {
      admin_id,
      org_id,
      report_id,
      report_date,
      total_sales,
      total_transactions,
      report_data,
    } = data;
    try {
      const createReceipts = await salesReportModel.create({
        admin_id,
        org_id,
        report_id,
        report_date,
        total_sales,
        total_transactions,
        report_data,
      });
      return createReceipts;
    } catch (error) {
      throw error;
    }
  },
  //=======================================
  getSalesReport: async (salesReport_id, admin_id, org_id) => {
    try {
      const getsalesReport = await salesReportModel.findById(salesReport_id);
      return getsalesReport;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  loyaltyProgramsCreate: async (data) => {
    const {
      admin_id,
      org_id,
      loyalty_program_id,
      customer_id,
      reward_points,
      last_updated,
    } = data;
    try {
      const createReceipts = await loyaltyProgramsModel.create({
        admin_id,
        org_id,
        loyalty_program_id,
        customer_id,
        reward_points,
        last_updated,
      });
      return createReceipts;
    } catch (error) {
      throw error;
    }
  },
  //======================================
  getIdLoyaltyPrograms: async (Loyalty_program_id, admin_id, org_id) => {
    try {
      const loyaltyProgramsId = await loyaltyProgramsModel.findById(
        Loyalty_program_id
      );
      return loyaltyProgramsId;
    } catch (error) {
      throw error;
    }
  },
  //======================================
  allOrdersFilter: async (admin_id, org_id, order_date, order_status) => {
    try {
      const filter = {};

      if (order_date) {
        filter.order_date = order_date;
        console.log("Fetching by order_item_id:", filter.order_date);
        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (order_status) {
        filter.order_status = order_status;
        console.log("Fetching by order_id:", filter.order_status);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const getAllOrders = await orderModel.find(filter);
      console.log(getAllOrders);
      return getAllOrders;

      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //==========================================
  getallitems: async (
    admin_id,
    org_id,
    order_item_id,
    order_id,
    product_id,
    quantity,
    price
  ) => {
    try {
      const filter = {};

      if (order_item_id) {
        filter.order_item_id = order_item_id;
        console.log("Fetching by order_item_id:", filter.order_item_id);
        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (order_id) {
        filter.order_id = order_id;
        console.log("Fetching by order_id:", filter.order_id);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (product_id) {
        filter.product_id = product_id;
        console.log("Fetching by product_id:", filter.product_id);
      }
      if (quantity) {
        filter.quantity = quantity;
        console.log("Fetching by quantity:", filter.quantity);
        //return allOrderItems.map(item => ({ quantity: quantity}));
      }
      if (price) {
        filter.price = price;
        console.log("Fetching by price:", filter.price);
        //return allOrderItems.map(item => ({ price: price}));
      }

      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const allOrderItems = await orderItemModel.find(filter);
      console.log(allOrderItems);
      return allOrderItems;
      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //=========================================

  //==============================================================
  getallPayment: async (admin_id, org_id, payment_status, payment_date) => {
    try {
      const filter = {};

      if (payment_status) {
        filter.payment_status = payment_status;
        console.log("Fetching by order_item_id:", filter.payment_status);

        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (payment_date) {
        filter.payment_date = payment_date;
        console.log("Fetching by order_id:", filter.payment_date);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const getAllPayments = await paymentModel.find(filter);
      console.log(getAllPayments);
      return getAllPayments;
      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //======================================================
  getAllReceipts: async (
    admin_id,
    org_id,
    order_id,
    receipt_type,
    receipt_date,
    receipt_data
  ) => {
    try {
      const filter = {};

      if (order_id) {
        filter.order_id = order_id;
        console.log("Fetching by order_item_id:", filter.order_id);

        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (receipt_type) {
        filter.receipt_type = receipt_type;
        console.log("Fetching by order_id:", filter.receipt_type);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (receipt_date) {
        filter.receipt_date = receipt_date;
        console.log("Fetching by order_id:", filter.receipt_date);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (receipt_data) {
        filter.receipt_data = receipt_data;
        console.log("Fetching by order_id:", filter.receipt_data);
        //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const getAllreceipts = await receiptsModel.find(filter);
      console.log(getAllreceipts);
      return getAllreceipts;
      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //==============================================
  getallSalesreport: async (admin_id, org_id, report_date) => {
    try {
      const filter = {};

      if (report_date) {
        filter.report_date = report_date;
        console.log("Fetching by order_item_id:", filter.report_date);

        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }
      const results = await salesReportModel.find(filter);
      console.log(results);
      return results;
      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //======================================================
  getAllLoyaltyProgram: async (
    admin_id,
    org_id,
    customer_id,
    reward_points,
    last_updated
  ) => {
    try {
      const filter = {};

      if (customer_id) {
        filter.customer_id = customer_id;
        console.log("Fetching by customer_id:", filter.customer_id);
      }
      if (reward_points) {
        filter.reward_points = reward_points;
        console.log("Fetching by reward_points:", filter.reward_points);
      }
      if (last_updated) {
        filter.last_updated = last_updated;
        console.log("Fetching by last_updated:", filter.last_updated);
      }

      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }

      const results = await loyaltyProgramsModel.find(filter);
      console.log(results);
      return results;
    } catch (error) {
      throw new Error("Error fetching loyalty programs: " + error.message);
    }
  },
  //===========================================
  schedules: async (data) => {
    const {
      admin_id,
      org_id,
      employee_id,
      shift_start,
      shift_end,
      shift_type,
      status,
    } = data;
    try {
      const scheduleCreate = await scheduleModel.create({
        admin_id,
        org_id,
        employee_id,
        shift_start,
        shift_end,
        shift_type,
        status,
      });
      return scheduleCreate;
    } catch (error) {
      throw error;
    }
  },
  //=============================================
  getSchedules: async (data) => {
    const schedule_id = data;
    try {
      const getSchedules = await scheduleModel.findById(schedule_id);
      return getSchedules;
    } catch (error) {
      throw error;
    }
  },
  //============================================
  updateSchedules: async (data) => {
    const {
      schedule_id,
      employee_id,
      shift_start,
      shift_end,
      shift_type,
      status,
    } = data;
    try {
      const changeSchedules = await scheduleModel.findByIdAndUpdate(
        schedule_id,
        {
          employee_id,
          shift_start,
          shift_end,
          shift_type,
          status,
        },
        { new: true }
      );
      return changeSchedules;
    } catch (error) {
      throw error;
    }
  },
  //======================================================
  getEmployee: async (employee_id, timestamp) => {
    try {
      const filter = {};

      if (employee_id) {
        filter.employee_id = employee_id;
        console.log("Fetching by employee_id:", filter.employee_id);
      }
      if (timestamp) {
        const date = new Date(timestamp);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        filter.timestamp = { $gte: startOfDay, $lte: endOfDay };
        console.log("Fetching by timestamp:", filter.timestamp);
      }
      if (Object.keys(filter).length === 0) {
        console.log(
          "No valid filter criteria provided; returning all records."
        );
        const results = await scheduleModel.find();
        return results;
      }
      const results = await scheduleModel.find(filter);
      console.log("Results:", results);
      return results;
    } catch (error) {
      throw new Error("Error fetching employee data: " + error.message);
    }
  },
  //==============================================
  TimeOffRequests: async (data) => {
    const {
      admin_id,
      org_id,
      employee_id,
      request_date,
      start_date,
      end_date,
      status,
    } = data;
    try {
      const TimeOffRequestCreate = await TimeOffRequestsModel.create({
        admin_id,
        org_id,
        employee_id,
        request_date,
        start_date,
        end_date,
        status,
      });
      return TimeOffRequestCreate;
    } catch (error) {
      throw error;
    }
  },
  //====================================================
  getTimeOffRequests: async (data) => {
    const request_id = data;
    try {
      const getSchedules = await TimeOffRequestsModel.findById(request_id);
      return getSchedules;
    } catch (error) {
      throw error;
    }
  },
  //==================================================
  updateTimeOffRequests: async (data) => {
    const {
      request_id,
      employee_id,
      request_date,
      start_date,
      end_date,
      status,
    } = data;
    try {
      const changeTimeoffRequest = await TimeOffRequestsModel.findByIdAndUpdate(
        request_id,
        {
          employee_id,
          request_date,
          start_date,
          end_date,
          status,
        },
        { new: true }
      );
      return changeTimeoffRequest;
    } catch (error) {
      throw error;
    }
  },
  //====================================================
  filterTimeOffRequests: async (employee_id, status) => {
    try {
      const filter = {};

      if (employee_id) {
        filter.employee_id = employee_id;
        console.log("Fetching by employee_id:", filter.employee_id);
      }
      if (status) {
        filter.status = status;
        console.log("Fetching by employee_id:", filter.status);
      }
      if (Object.keys(filter).length === 0) {
        console.log(
          "No valid filter criteria provided; returning all records."
        );
        const results = await TimeOffRequestsModel.find();
        return results;
      }
      const results = await TimeOffRequestsModel.find(filter);
      console.log("Results:", results);
      return results;
    } catch (error) {
      throw new Error("Error fetching employee data: " + error.message);
    }
  },
  //===========================================================
  Tasks: async (data) => {
    const {
      admin_id,
      org_id,
      employee_id,
      task_name,
      deadline,
      priority,
      status,
    } = data;
    try {
      const TimeOffRequestCreate = await TasksModel.create({
        admin_id,
        org_id,
        employee_id,
        task_name,
        deadline,
        priority,
        status,
      });
      return TimeOffRequestCreate;
    } catch (error) {
      throw error;
    }
  },
  //===============================================
  getTask: async (data) => {
    const task_id = data;
    try {
      const getTask = await TasksModel.findById(task_id);
      return getTask;
    } catch (error) {
      throw error;
    }
  },
  //=============================================
  updateTask: async (data) => {
    const { task_id, employee_id, task_name, deadline, priority, status } =
      data;
    try {
      const changeTask = await TasksModel.findByIdAndUpdate(
        task_id,
        {
          employee_id,
          task_name,
          deadline,
          priority,
          status,
        },
        { new: true }
      );
      return changeTask;
    } catch (error) {
      throw error;
    }
  },
  //===================================================
  filterTask: async (employee_id, status) => {
    try {
      const filter = {};

      if (employee_id) {
        filter.employee_id = employee_id;
        console.log("Fetching by employee_id:", filter.employee_id);
      }
      if (status) {
        filter.status = status;
        console.log("Fetching by employee_id:", filter.status);
      }
      if (Object.keys(filter).length === 0) {
        console.log(
          "No valid filter criteria provided; returning all records."
        );
        const results = await TasksModel.find();
        return results;
      }
      const results = await TasksModel.find(filter);
      console.log("Results:", results);
      return results;
    } catch (error) {
      throw new Error("Error fetching employee data: " + error.message);
    }
  },
};

export default salesService;
