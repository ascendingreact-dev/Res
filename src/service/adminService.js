import categoryModel from "../model/categoryTable.js";
import iconModel from "../model/iconModel.js";
import applogoModel from "../model/logoModel.js";
import organizationModel from "../model/organizationModel.js";
import ProductModel from "../model/productModel.js";
import registerModel from "../model/registerModel.js";
import roomstableModel from "../model/roomsModel.js";
import statusColorModel from "../model/statusColorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import memberRegistationModel from "../model/memberRegistationModel.js";
import productEntryModel from "../model/productEntryModel.js";
import notesmasterModel from "../model/notesmasterModel.js";
import gstModel from "../model/gstModel.js";
import menuItemModel from "../model/menuItemModel.js";
import "dotenv/config";

import moment from "moment";

import path from "path";
import { fileURLToPath } from "url";

import orderModel from "../model/orderModel.js";
import orderItemModel from "../model/orderItemModel.js";
import customerModel from "../model/customerModel.js";
import paymentModel from "../model/paymentModel.js";
import receiptsModel from "../model/receiptsModel.js";
import salesReportModel from "../model/salesReportModel.js";
import loyaltyProgramsModel from "../model/loyaltyProgramsModel.js";
import TablesModels from "../model/TablesModel.js";
import notemasterModel from "../model/notesmasterModel.js";
import menuCategoryModel from "../model/menuCategory.js";
import userRegModel from "../model/userRegModel.js";
import inventoryModel from "../model/InventoryModel.js";
import locationModel from "../model/locationModel.js";
import deliverySchemaModel from "../model/deliveryPartnerModel.js";
import deliveryPartnerModel from "../model/deliveryPartnerModel.js";
import ThiedPartyActiveModel from "../model/ThirdPartyActivateModel.js";
import userModel from "../model/userModel.js";
import userOrderModel from "../model/userOrderModel.js";
import { timeStamp } from "console";
import discountModel from "../model/discountModel.js";
import socket_server from "../../soketServer.js";
import planModel from "../model/planModel.js";
import accountModel from "../model/Account/accountModel.js";
import admin from "../../firebaseConfig.js";
import purchaseModel from "../model/PurchaseOrderModel.js";
import PurchaseModel from "../model/purchaseHistoryModel.js";
import salesService from "./salesService.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const adminService = {
  createApp: async (data) => {
    const { appLogo, mainCategory_id, sub_Category } = data;
    try {
      const createdApp = await applogoModel.create({
        appLogo,
        mainCategory_id,
        sub_Category,
      });
      return createdApp;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  getApp: async () => {
    try {
      const getApp = await applogoModel.find();

      return getApp;
    } catch (error) {
      throw error;
    }
  },
  // ============================
  updateApp: async (data) => {
    const { applogo_id, appLogo, sub_Category } = data;
    try {
      const updateApp = await applogoModel.findByIdAndUpdate(
        applogo_id,
        {
          appLogo,
          sub_Category,
        },
        {
          new: true,
        }
      );
      if (!updateApp) {
        throw new Error("not found");
      }

      return updateApp;
    } catch (error) {
      throw error;
    }
  },
  // ================================
  deleteApp: async (applogo_id) => {
    console.log(applogo_id, "jjjj");
    try {
      const deleteApp = await applogoModel.findByIdAndDelete(applogo_id);
      if (!deleteApp) {
        throw new Error("logo not found");
      }
      return deleteApp;
    } catch (error) {
      throw error;
    }
  },
  // ========================
  status: async (data) => {
    const { statusColor, statusName } = data;
    try {
      const createdStatus = await statusColorModel.create({
        statusColor,
        statusName,
      });
      return createdStatus;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  getAllstatus: async () => {
    try {
      const getApp = await statusColorModel.find();

      return getApp;
    } catch (error) {
      throw error;
    }
  },
  // ============================
  updatestatus: async (data) => {
    const { status_id, statusColor, statusName } = data;
    try {
      const updatestatus = await statusColorModel.findByIdAndUpdate(
        status_id,
        {
          statusColor,
          statusName,
        },
        {
          new: true,
        }
      );

      return updatestatus;
    } catch (error) {
      throw error;
    }
  },
  // ================================
  deletestatus: async (status_id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(status_id)) {
        throw new Error("Invalid status_id format.");
      }

      console.log("Attempting to delete status with ID:", status_id);

      const deleteApp = await statusColorModel.findByIdAndDelete(status_id);

      if (!deleteApp) {
        console.log(`No record found with status_id: ${status_id}`);
      } else {
        console.log(`Deleted document:`, deleteApp);
      }
      return deleteApp;
    } catch (error) {
      throw error;
    }
  },
  // ===========================
  createCategory: async (data) => {
    const { categoryName, price } = data;

    try {
      const createCategory = await categoryModel.create({
        categoryName,
        price,
      });
      console.log("Successfully stored");
      return createCategory;
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  getAllCategory: async () => {
    try {
      const getApp = await categoryModel.find();
      return getApp;
    } catch (error) {
      throw error;
    }
  },
  // ============================
  updateCategory: async (data) => {
    const { category_id, categoryName, price } = data;
    try {
      const updateCategory = await categoryModel.findByIdAndUpdate(
        category_id,
        {
          categoryName,
          price,
        },
        {
          new: true,
        }
      );

      return updateCategory;
    } catch (error) {
      throw error;
    }
  },
  // ================================
  deleteCategory: async (category_id) => {
    try {
      console.log("Deleting category with ID:", category_id);
      const deletedCategory = await categoryModel.findByIdAndDelete(
        category_id
      );
      console.log(deletedCategory, "Deleted category");
      if (!deletedCategory) {
        throw new Error("Category not found");
      }
      return "deleted";
    } catch (error) {
      console.error("Error occurred while deleting category:", error);
      throw error;
    }
  },

  //============================================

  deleteTable: async (data) => {
    const { tablerooms_id, org_id } = data;
    try {
      const removeTableRooms = await roomstableModel.findOneAndDelete({
        org_id,
        _id: tablerooms_id,
      });
      return removeTableRooms;
    } catch (error) {
      throw error;
    }
  },

  // =================
  /*  register: async (data) => {
    const { category_id, email } = data;

    try {
      const organization = await adminService.organization(category_id);
      const register = await adminService.registers({
        org_id: organization._id,
        email,
      });
      // console.log(register, "Registration created");

      const updateOrg = await adminService.updateOrganization({
        org_id: organization._id,
        admin_id: register._id,
      });
      // console.log(updateOrg, "Organization updated");

      return {
        organization,
        updateOrg,
        register,
      };
    } catch (error) {
      throw error;
    }
  },
 */

  // Main register flow
  register: async (data) => {
    const { category_id, email, location, mobileNo, adminImg, plan_id } = data;

    try {
      // 1. Create organization with plan & validto
      const organization = await adminService.organization(
        category_id,
        plan_id
      );

      // 2. Create admin register entry
      const register = await adminService.registers({
        org_id: organization._id,
        email,
        location,
        mobileNo,
        adminImg,
      });

      // 3. Update organization with admin_id
      const updateOrg = await adminService.updateOrganization({
        org_id: organization._id,
        admin_id: register._id,
      });

      return {
        organization,
        updateOrg,
        register,
      };
    } catch (error) {
      throw error;
    }
  },

  // ===================
  registers: async (data) => {
    const { org_id, email, location, mobileNo, adminImg } = data;

    try {
      const user = await registerModel.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }
      const register = await registerModel.create({
        org_id,
        email,
        applogo_id: 0,
        userName: "",
        password: "",
        location,
        mobileNo,
        adminImg,
      });
      console.log(register, "Registration created");
      return register;
    } catch (error) {
      throw error;
    }
  },

  // =============================
  /*  organization: async (category_id) => {
    try {
      const organization = await organizationModel.create({
        category_id,
        admin_id: 0,
        Gst: {},
        KOT_No: "",
        Bill_No: "",
      });

      console.log(organization, "Organization created successfully");
      return organization;
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error;
    }
  }, */

  organization: async (category_id, plan_id) => {
    try {
      // Fetch plan to calculate validto
      const plan = await planModel.findById(plan_id);
      if (!plan) throw new Error("Plan not found");

      // Calculate validto
      let validto = new Date();
      const { value, unit } = plan.duration;

      if (unit === "days") validto.setDate(validto.getDate() + value);
      else if (unit === "months") validto.setMonth(validto.getMonth() + value);
      else if (unit === "years")
        validto.setFullYear(validto.getFullYear() + value);
      else throw new Error("Invalid duration unit in plan");

      // Create org with plan_id and validto
      const organization = await organizationModel.create({
        category_id,
        admin_id: 0,
        plan_id,
        validto,
        Gst: {},
        KOT_No: "",
        Bill_No: "",
      });

      console.log(organization, "Organization created successfully");
      return organization;
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error;
    }
  },

  // =======================
  updateOrganization: async (data) => {
    const { org_id, admin_id } = data;
    console.log(data, "dataa");
    try {
      const updateOrg = await organizationModel.findByIdAndUpdate(
        org_id,
        {
          admin_id: admin_id,
        },
        {
          new: true,
        }
      );
      console.log(updateOrg, "Organization updated with admin_id");
      return updateOrg;
    } catch (error) {
      throw error;
    }
  },
  // =================
  updatePassword: async (data) => {
    const { admin_id, userName, password } = data;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword", hashedPassword);

      const updatePassword = await registerModel.findByIdAndUpdate(
        admin_id,
        {
          userName,
          password: hashedPassword,
        },
        {
          new: true,
        }
      );
      return updatePassword;
    } catch (error) {
      throw error;
    }
  },

  // ===================
  /*  userCommonregister: async (data) => {
    console.log(data, "j");
    const { admin_id, org_id, applogo_id, EmailId, password } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const user = await userRegModel.findOne({ EmailId });
      if (user) {
        throw new Error("Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword", hashedPassword);
      const adminregister = await userRegModel.create({
        admin_id,
        applogo_id,
        org_id,
        EmailId,
        password: hashedPassword,
        status: true,
        userDetails_id: 0,
      });
      console.log("Successfully stored");
      return adminregister;
    } catch (error) {
      throw error;
    }
  }, */

  /*
  //app user count register
  userCommonregister: async (data) => {
    const { admin_id, org_id, applogo_id, EmailId, emp_name, password } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) throw new Error("Admin not found");

      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");

      // 🔐 Check if plan is valid
      const now = new Date();
      if (new Date(org.validto) < now) {
        throw new Error("Plan expired. Please renew to add users.");
      }

      const plan = await planModel.findById(org.plan_id);
      if (!plan) throw new Error("Plan not found");

      const app = await applogoModel.findById(applogo_id);
      const app_name = app?.sub_Category;
      if (!app_name) throw new Error("App not found");

      const access = plan.appaccess.find((a) => a.app_name === app_name);
      if (!access)
        throw new Error(`This plan does not allow access to ${app_name}`);

      const allowedUserCount = access.user_count;

      const currentUsers = await userRegModel.countDocuments({
        org_id,
        applogo_id,
      });

      if (currentUsers >= allowedUserCount) {
        throw new Error(`User limit exceeded for ${app_name}`);
      }

      const userExists = await userRegModel.findOne({org_id, EmailId });
      if (userExists) {
        throw new Error("Email already exists");
      }
      const userName = await userRegModel.findOne({org_id, emp_name });
      if (userName) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRegModel.create({
        admin_id,
        applogo_id,
        org_id,
        EmailId,
        emp_name,
        password: hashedPassword,
        status: true,
        userDetails_id: 0,
        appName: app_name,
      });

      console.log("User registered successfully");
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }, */

  userCommonregister: async (data) => {
    const {
      admin_id,
      org_id,
      applogo_id,
      EmailId,
      emp_name,
      password,
      ContactNo,
      Tables,
      role,
    } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) throw new Error("Admin not found");

      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");

      // 🔐 Check if plan is valid
      const now = new Date();
      if (new Date(org.validto) < now) {
        throw new Error("Plan expired. Please renew to add users.");
      }

      const plan = await planModel.findById(org.plan_id);
      if (!plan) throw new Error("Plan not found");

      const app = await applogoModel.findById(applogo_id);
      const app_name = app?.sub_Category;
      if (!app_name) throw new Error("App not found");
      const allowedUserCount = plan.userCount;

      // ✅ Get current user count
      const { count: totalUserCount } = await salesService.getallUser({
        org_id,
      });

      if (totalUserCount >= allowedUserCount) {
        throw new Error(
          `User limit exceeded. Your plan allows only ${allowedUserCount} users in total`
        );
      }

      const userExists = await userRegModel.findOne({ org_id, EmailId });
      if (userExists) {
        throw new Error("Email already exists");
      }
      const userName = await userRegModel.findOne({ org_id, emp_name });
      if (userName) {
        throw new Error("name already exists");
      }
      const contactExists = await userRegModel.findOne({ org_id, ContactNo });
      if (contactExists) {
        throw new Error("Contact Number already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRegModel.create({
        admin_id,
        applogo_id,
        org_id,
        EmailId,
        emp_name,
        password: hashedPassword,
        status: true,
        role,
        ContactNo,
        Tables,
      });

      console.log("User registered successfully");
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  // ====================
  /* userCommonlogin: async (data) => {
    const { EmailId, password, category } = data;
    console.log(data, "Fd");
    try {
      const user = await userRegModel.findOne({
        EmailId,
      });
      if (!user) {
        throw new Error("User not found");
      }
      console.log(user.applogo_id, "kfk");
      const categories = await applogoModel.findById(user.applogo_id);
      console.log(categories.sub_Category, "kk");

      if (category !== categories.sub_Category) {
        throw new Error("category not matching");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
      return {
        token,
        user,
      };
    } catch (error) {
      console.log(error, "kkk");
      throw error;
    }
  }, */

  /* userCommonlogin: async (data) => {
    const { EmailId, password, category } = data;

    try {
      const user = await userRegModel.findOne({ EmailId });
      if (!user) throw new Error("User not found");

      const app = await applogoModel.findById(user.applogo_id);
      if (!app || app.sub_Category !== category) {
        throw new Error("App category does not match");
      }

      const org = await organizationModel.findById(user.org_id);
      if (!org) throw new Error("Organization not found");

      // ⛔ Plan Expiry Check
      const now = new Date();
      if (new Date(org.validto) < now) {
        throw new Error("Plan expired. Please renew to login.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("Invalid password");

      // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "7d",
      // });
      const token = jwt.sign({}, process.env.JWT_SECRET_KEY);

      return {
        token,
        user,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, */




 userCommonlogin: async (data) => {
 /*  const { EmailId, password, category } = data;

  try {
    // ✅ Step 1: Find users by Email + category
    const users = await userRegModel.find({ EmailId, role:category });
    if (!users || users.length === 0) {
      throw new Error("User not found with this category");
    }
    // ✅ Step 2: Check password for each user
    const matchedUsers = [];
    for (const u of users) {
      const isPasswordMatch = await bcrypt.compare(password, u.password);
      if (isPasswordMatch) {
        matchedUsers.push(u);
      }
    }

    if (matchedUsers.length === 0) {
      throw new Error("Invalid password");
    }

    // ✅ Step 3: Multiple orgs check
    if (matchedUsers.length > 1) {
      const orgList = await Promise.all(
        matchedUsers.map(async (u) => {
          let adminEmail = null;
          if (u.admin_id) {
            const admin = await registerModel.findById(u.admin_id); // or adminModel if separate
            if (admin) {
              adminEmail = admin.email;
            }
          }

          return {
            org_id: u.org_id,
            admin_id: u.admin_id,
            user_email: u.EmailId,
            admin_email: adminEmail,
          };
        })
      );

      return {
        message: "Multiple orgs found, please select one",
        requiresOrgSelection: true,
        orgs: orgList,
      };
    }

    // ✅ Step 4: Single user found
    const user = matchedUsers[0];

    // ✅ Step 4: Validate category with applogo
    const app = await applogoModel.findById(user.applogo_id);
    if (!app || app.sub_Category !== category) {
      throw new Error("App category does not match");
    }

    // ✅ Step 5: Validate organization & plan expiry
    const org = await organizationModel.findById(user.org_id);
    if (!org) {
      throw new Error("Organization not found");
    }

    const now = new Date();
    if (new Date(org.validto) < now) {
      throw new Error("Plan expired. Please renew to login.");
    }

    // ✅ Step 6: Validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    // ✅ Step 7: Generate JWT
    const token = jwt.sign(
      { userId: user._id, orgId: user.org_id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return {
      message: "Login success",
      user,
      token,
      requiresOrgSelection: false,
    };
 */
const { EmailId, password, category, admin_email } = data;

  try {
    // Step 1: Find users by Email + category
    const users = await userRegModel.find({ EmailId, role:category });
    if (!users || users.length === 0) {
      throw new Error("User not found with this category");
    }

    // Step 2: Password validation
    const matchedUsers = [];
    for (const u of users) {
      const isPasswordMatch = await bcrypt.compare(password, u.password);
      if (isPasswordMatch) {
        matchedUsers.push(u);
      }
    }

    if (matchedUsers.length === 0) {
      throw new Error("Invalid password");
    }

    let user;

    // Step 3: If multiple orgs, check admin_email
    if (matchedUsers.length > 1) {
      if (!admin_email) {
        // If admin_email not provided, ask user to select
        const orgList = await Promise.all(
          matchedUsers.map(async (u) => {
            let adminEmail = null;
            if (u.admin_id) {registerModel
              const admin = await registerModel.findById(u.admin_id); // or adminModel if separate
              if (admin) {
                adminEmail = admin.email;
              }
            }

            return {
              org_id: u.org_id,
              admin_id: u.admin_id,
              user_email: u.EmailId,
              admin_email: adminEmail,
            };
          })
        );

        return {
          message: "Multiple orgs found, please select one",
          requiresOrgSelection: true,
          orgs: orgList,
        };
      }

      // If admin_email is provided, find the right org
      user = null;
      for (const u of matchedUsers) {
        const admin = await registerModel.findById(u.admin_id); // or adminModel
        if (admin && admin.email === admin_email) {
          user = u;
          break;
        }
      }

      if (!user) {
        throw new Error("No matching org found for given admin email");
      }
    } else {
      // Only one matched user
      user = matchedUsers[0];
    }

    // Step 4: Validate category with applogo
    const app = await applogoModel.findById(user.applogo_id);
    if (!app || app.sub_Category !== category) {
      throw new Error("App category does not match");
    }

    // Step 5: Validate organization & plan expiry
    const org = await organizationModel.findById(user.org_id);
    if (!org) {
      throw new Error("Organization not found");
    }

    const now = new Date();
    if (new Date(org.validto) < now) {
      throw new Error("Plan expired. Please renew to login.");
    }

    // Step 6: Generate JWT
    const token = jwt.sign(
      { userId: user._id, orgId: user.org_id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return {
      message: "Login success",
      user,
      token,
      requiresOrgSelection: false,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
},















  //updated by single model login with detail
  /* userCommonlogin: async (data) => {
    const { EmailId, password, category } = data;
    console.log(data, "Fd");
    try {
      const user = await userModel.findOne({
        EmailId,
      });
      if (!user) {
        throw new Error("User not found");
      }
      console.log(user.applogo_id, "kfk");
      const categories = await applogoModel.findById(user.applogo_id);
      console.log(categories.sub_Category, "kk");

      if (category !== categories.sub_Category) {
        throw new Error("category not matching");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
      return {
        token,
        user,
      };
    } catch (error) {
      console.log(error, "kkk");
      throw error;
    }
  }, */
  // ===============
  userregister: async (data) => {
    console.log(data, "j");
    const { admin_id, org_id, applogo_id, password, employee } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "Admin not found" };
      }

      const existingUser = await userRegModel.findOne({
        applogo_id,
        status: false,
      });

      if (existingUser) {
        const addEmp = await userRegModel.findByIdAndUpdate(
          existingUser._id,
          { $push: { employee: employee } },
          { new: true }
        );
        console.log("Employee added to existing user.");
        return { addEmp, message: "Employee added to existing user" };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword);

        const newUser = await userRegModel.create({
          admin_id,
          applogo_id,
          org_id,
          password: hashedPassword,
          employee: [employee],
          status: false,
        });

        console.log("Successfully created new user");
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  },

  // ----------
  userlogin: async (data) => {
    const { applogo_id, password, emp_id } = data;

    try {
      const app = await userRegModel.findOne({
        applogo_id,
        "employee.emp_id": emp_id,
      });

      // const user = await userRegModel.findOne({"employee.emp_id":emp_id});

      if (!app) {
        throw { err: "User not found" };
      }

      const isPasswordMatch = await bcrypt.compare(password, app.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { downloadApp_id: app._id },
        process.env.JWT_SECRET_KEY
      );
      // console.table(app)
      return {
        token,
        app,
      };
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  },

  /*  userlogin: async (data) => {
    const { applogo_id, password, emp_id } = data;

    try {
      const app = await userModel.findOne({
        applogo_id,
        emp_id,
      });

      // const user = await userRegModel.findOne({"employee.emp_id":emp_id});

      if (!app) {
        throw { err: "User not found" };
      }

      const isPasswordMatch = await bcrypt.compare(password, app.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { downloadApp_id: app._id },
        process.env.JWT_SECRET_KEY
      );
      // console.table(app)
      return {
        token,
        app,
      };
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }, */
  //**************************** */

  getRemainingUserCount: async (data) => {
    const { org_id } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");
      const plan = await planModel.findById(org.plan_id);
      if (!plan) throw new Error("Plan not found");

      const planUserCount = plan.userCount;
      const users = await userRegModel.find({ org_id });
      const admin = await registerModel.findOne({ org_id });

      const currentUserCount = users.length + (admin ? 1 : 0);

      const remainingUserCount = planUserCount - currentUserCount;

      return {
        planUserCount,
        currentUserCount,
        remainingUserCount: remainingUserCount >= 0 ? remainingUserCount : 0,
      };
    } catch (error) {
      throw error;
    }
  },

  //===============================

  getUser: async (data) => {
    const { org_id, admin_id } = data;
    try {
      const organization = await organizationModel.findById(org_id);
      if (!organization) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const user = await userRegModel.find({ org_id });
      return user;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },
  //**************************** */
  // -----------------------
  userUpdatePassword: async (data) => {
    const { org_id, applogo_id, EmailId, password } = data;
    console.log(data, "kkk");

    try {
      const organization = await organizationModel.findById(org_id);
      if (!organization) {
        throw new Error("org not found");
      }
      const update = await userRegModel.findOne({ EmailId, org_id });
      console.log(update, "kj");
      if (!update) {
        throw new Error("email not found");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword", hashedPassword);

      const updatePassword = await userRegModel.findOneAndUpdate(
        {
          applogo_id,
          org_id,
        },
        {
          password: hashedPassword,
        },
        {
          new: true,
        }
      );

      console.log(updatePassword, "k");
      return updatePassword;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },

  // ================
  /*  login: async (data) => {
    const { email, password } = data;
    try {
      const admin = await registerModel.findOne({
        email,
      });
      if (!admin) {
        throw {
          error: "Admin not found",
        };
      }
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatch) {
        throw {
          error: "Invalid password",
        };
      }
      const token = jwt.sign(
        {
          admin_id: admin._id,
        },
        process.env.JWT_SECRET_KEY
      );
      return {
        token,
        admin,
      };
    } catch (error) {
      throw error;
    }
  }, */

  login: async (data) => {
    const { email, password } = data;

    try {
      const admin = await registerModel.findOne({ email });
      if (!admin) {
        throw { error: "Admin not found" };
      }

      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatch) {
        throw { error: "Invalid password" };
      }

      // Fetch the organization of this admin
      const org = await organizationModel.findOne({ admin_id: admin._id });

      let isPlanExpired = false;

      if (org && org.validto) {
        const now = new Date();
        if (new Date(org.validto) < now) {
          isPlanExpired = true; // mark expired
        }
      }

      const token = jwt.sign(
        {
          admin_id: admin._id,
        },
        process.env.JWT_SECRET_KEY
      );

      return {
        token,
        admin,
        isPlanExpired, // frontend can use this to show upgrade plan screen
      };
    } catch (error) {
      throw error;
    }
  },
  // ===========================
  getOrganisation: async (admin_id) => {
    try {
      const getOrganisation = await organizationModel.find({
        admin_id,
      });
      return getOrganisation;
    } catch (error) {
      throw error;
    }
  },
  // ================
  getOverAllorganisation: async () => {
    try {
      const getOverAllorganisation = await organizationModel.find();
      return getOverAllorganisation;
    } catch (error) {
      throw error;
    }
  },

  deleteOrganization: async (data) => {
    const { organization_id } = data;
    try {
      const deleteDetailOrgId = await organizationModel.findByIdAndDelete(
        organization_id
      );
      if (!deleteDetailOrgId) {
        throw new Error("Organization not found");
      }
      return deleteDetailOrgId;
    } catch (error) {
      throw error;
    }
  },

  //============================= profile ==============================

  getProfile: async (data) => {
    const { admin_id, org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const adminProfile = await registerModel
        .findOne({ _id: admin_id, org_id })
        .select("-password");
      if (!adminProfile) {
        throw new Error("admin not found");
      }
      return adminProfile;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data) => {
    const { admin_id, org_id, userName, location, mobileNo, adminImg } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }

      const updatedData = {
        userName,
        location,
        mobileNo,
        adminImg,
        updatedAt: new Date(),
      };

      const updateProfile = await registerModel.findOneAndUpdate(
        { _id: admin_id, org_id },
        updatedData,
        { new: true }
      );

      if (!updateProfile) {
        throw new Error("admin not found");
      }

      return updateProfile;
    } catch (error) {
      throw error;
    }
  },

  // =============
  menuCategory: async (data) => {
    const { admin_id, org_id, Category, CategoryIcon } = data;
    console.log(data);

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }

      const existName = await menuCategoryModel.findOne({ Category, org_id });
      if (existName) {
        throw new Error("name already exist");
      }

      const menuCategory = await menuCategoryModel.create({
        admin_id,
        org_id,
        Category,
        CategoryIcon,
      });
      return menuCategory;
    } catch (error) {
      console.error("Error creating menu category:", error);
      throw error;
    }
  },

  //new
  getMenuCategory: async (data) => {
    const { org_id, menu_Category_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getCat = await menuCategoryModel.findOne({
        _id: menu_Category_id,
        org_id,
      });
      return getCat;
    } catch (error) {
      throw error;
    }
  },
  getAllCategoryList: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getAllCat = await menuCategoryModel.find({ org_id });
      return getAllCat;
    } catch (error) {
      throw error;
    }
  },

  updateMenuCategory: async (data) => {
    const { admin_id, org_id, menu_Category_id, Category, CategoryIcon } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const menuCat = await menuCategoryModel.findById(menu_Category_id);
      if (!menuCat) {
        throw new Error("category not found");
      }
      const updateCat = await menuCategoryModel.findByIdAndUpdate(
        menu_Category_id,
        { Category, CategoryIcon },
        { new: true }
      );
      return updateCat;
    } catch (error) {
      throw error;
    }
  },

  deleteMenuCategory: async (data) => {
    const { org_id, menu_Category_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      // Step 2: Check if the category is used in any menu items
      const menuExists = await menuItemModel.findOne({ menu_Category_id });
      if (menuExists) {
        throw new Error("Cannot delete category. It is in use by menu items.");
      }

      // Step 3: Delete the category
      const delMenu = await menuCategoryModel.findOneAndDelete({
        _id: menu_Category_id,
        org_id,
      });

      if (!delMenu) {
        throw new Error("Category not found or already deleted.");
      }

      return delMenu;
    } catch (error) {
      throw error;
    }
  },

  // ==================================

  /*   createMenuItem: async (data) => {
    const {
      admin_id,
      org_id,
      menuName,
      description,
      price,
      menuImg,
      Barcode,
      Category,
      CategoryIcon,
      available,
      allergen_info,
      dietary_info,
      menuType,
    } = data;

    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const category = await menuCategoryModel.findOne({ Category, org_id });
      let menu_Category_id;

      if (category) {
        menu_Category_id = category._id;
      } else {
        const newCategory = await menuCategoryModel.create({
          admin_id,
          org_id,
          Category,
          CategoryIcon,
        });
        menu_Category_id = newCategory._id;
      }

      let existingMenu = await menuItemModel.findOne({
        admin_id,
        org_id,
        menu_Category_id,
      });

      const menuItemDetails = {
        menuName,
        description,
        price,
        available,
        menuImg,
        allergen_info,
        dietary_info,
        Barcode,
        status: "Active",
        available: true,
        menuType,
      };

      if (existingMenu) {
        existingMenu.menuItems.push(menuItemDetails);
        await existingMenu.save();
      } else {
        existingMenu = await menuItemModel.create({
          admin_id,
          org_id,
          menu_Category_id: menu_Category_id,
          menuItems: [menuItemDetails],
        });
      }

      return existingMenu;
    } catch (error) {
      console.error("Error creating menu item:", error);
      console.log("Failed to create menu item. Please try again later.");
      throw error;
    }
  }, */
  createMenuItem: async (data) => {
    const {
      admin_id,
      org_id,
      menuName,
      description,
      price,
      menuImg,
      Barcode,
      menu_Category_id,
      available,
      allergen_info,
      dietary_info,
      menuType,
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
      const category = await menuCategoryModel.findOne({
        _id: menu_Category_id,
        org_id,
      });
      if (!category) {
        throw new Error("Category not found or invalid");
      }
      const barcodeExists = await menuItemModel.findOne({
        org_id,
        "menuItems.Barcode": Barcode,
      });

      if (barcodeExists) {
        throw new Error("Barcode already exists. Please use a unique barcode.");
      }
      const menuItemDetails = {
        menuName,
        description,
        price,
        available,
        menuImg,
        allergen_info,
        dietary_info,
        Barcode,
        status: "Active",
        menuType,
      };
      const existingMenu = await menuItemModel.findOne({
        menu_Category_id,
        org_id,
      });

      let result;

      if (existingMenu) {
        result = await menuItemModel.findOneAndUpdate(
          { menu_Category_id, org_id },
          { $push: { menuItems: menuItemDetails } },
          { new: true }
        );
      } else {
        result = await menuItemModel.create({
          admin_id,
          org_id,
          menu_Category_id,
          menuItems: [menuItemDetails],
        });
      }

      return result;
    } catch (error) {
      console.error("Error creating menu item:", error);
      throw error;
    }
  },

  //======================================
  getmenuItems: async (org_id, Category) => {
    // console.log("Requested Category:", Category);
    try {
      const category = await menuCategoryModel.findOne({ org_id, Category });

      if (!category) {
        throw new Error(`Category '${Category}' not found`);
      }

      let menu = await menuItemModel
        .findOne({ menu_Category_id: category._id })
        .lean();

      if (!menu || !menu.menuItems || !menu.menuItems.length) {
        throw new Error(`No menu items found for category '${Category}'`);
      }
      if (!menu || !menu.menuItems || menu.menuItems.length === 0) {
        await menuCategoryModel.deleteOne({ _id: category._id });
        throw new Error(
          `No menu items found — category '${Category}' has been deleted`
        );
      }

      if (menu.menuItems.length === 0) {
        throw new Error("the category is empty");
      }

      const today = new Date();
      const todayString = today.toISOString().split("T")[0]; // "YYYY-MM-DD" format

      let discountAmount = null; // Initialize discountAmount to be returned
      const discount = await discountModel.findOne({
        org_id,
        isActive: true,
        validFrom: { $lte: todayString },
        validTo: { $gte: todayString },
      });

      if (discount) {
        discountAmount = discount.discountAmount; // Set discountAmount if discount is found
        const discountPercentage = parseFloat(
          discount.discountAmount.replace("%", "")
        );
        // console.log("Discount found:", discount);

        if (discount.dis_main_Category === "all product") {
          menu.menuItems = menu.menuItems.map((item) => {
            if (item.price) {
              const originalPrice = item.price;
              item.discountedPrice =
                item.price - (item.price * discountPercentage) / 100;
              // console.log(`Applied discount to item ${item._id}: Original price ${originalPrice}, Discounted price ${item.discountedPrice}`);
            } else {
              // console.warn(`Item ${item._id} does not have a price field.`);
            }
            return item;
          });
        } else if (
          discount.dis_main_Category.toLowerCase() === Category.toLowerCase()
        ) {
          const discountCategories = discount.discount_category.map((cat) =>
            cat.toLowerCase()
          );
          // console.log("Discount Categories:", discountCategories);

          menu.menuItems = menu.menuItems.map((item) => {
            const itemCategory = item.menuName
              ? item.menuName.toLowerCase()
              : null;
            // console.log("Item Category:", itemCategory);
            if (itemCategory && discountCategories.includes(itemCategory)) {
              if (item.price) {
                const originalPrice = item.price;
                item.discountedPrice =
                  originalPrice - (originalPrice * discountPercentage) / 100;
                // console.log(`Applied discount to item ${item._id}: Original price ${originalPrice}, Discounted price ${item.discountedPrice}`);
              } else {
                // console.warn(`Item ${item._id} does not have a 'price' field.`);
              }
            }
            return item;
          });
        }
      } else {
        // console.log("No active discounts found.");
      }
      const socket = await socket_server();
      console.log(socket, "ddddd");
      menu.menuItems = menu.menuItems.map((item) => ({
        ...item,
        menu_Category_id: category._id,
      }));

      return {
        menuItems: menu.menuItems,
        category: category.Category,
        menu_Category_id: category._id,
        discountAmount,
      };
      // return {
      //   menuItems: menu.menuItems,
      //   category: category.Category,
      //   menu_Category_id:category._id,
      //   discountAmount, // Include discountAmount in the return
      // };
    } catch (error) {
      console.error("Error in getmenuItems:", error.message);
      throw error;
    }
  },
  //===================================
  getoverallMenuitem: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      // Fetch data from the database
      const getOverallMenuitem = await menuItemModel
        .find({ org_id })
        .select("menuItems timestamp menu_Category_id")
        .populate({
          path: "menu_Category_id",
          model: "MenuCategory",
          select: "Category CategoryIcon",
        });

      console.log("Fetched Menu Items:", getOverallMenuitem);

      const categoryMap = {};

      // Organize menu items by category
      getOverallMenuitem.forEach((item) => {
        const menuCategory = item.menu_Category_id;
        const category = menuCategory?.Category || "Unknown";
        const categoryIcon = menuCategory?.CategoryIcon || "";

        if (!categoryMap[category]) {
          categoryMap[category] = {
            menu_Category_id: menuCategory?._id || null,
            Category: category,
            CategoryIcon: categoryIcon,
            items: new Set(),
          };
        }

        // Add each menu item to the category set
        item.menuItems.forEach((menuItem) => {
          categoryMap[category].items.add(
            JSON.stringify({
              menu_item_id: menuItem._id,
              menuName: menuItem.menuName,
              Available: menuItem.available,
              timestamp: item.timestamp,
              menuImg: menuItem.menuImg,
              price: menuItem.price,
              menuType: menuItem.menuType,
              description: menuItem.description,
              Barcode: menuItem.Barcode
            })
          );
        });
      });

      // Transform the category map into the desired format
      const menuItems = Object.values(categoryMap).map((categoryData) => ({
        menu_Category_id: categoryData.menu_Category_id,
        Category: categoryData.Category,
        CategoryIcon: categoryData.CategoryIcon,
        items: Array.from(categoryData.items).map((item) => JSON.parse(item)),
      }));

      return { data: menuItems };
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  },

  //====================================
  menuitemUpdate: async (data) => {
    const {
      admin_id,
      org_id,
      menu_item_id,
      menuName,
      description,
      price,
      menuImg,
      Barcode,
      menuType,
      Category
      // CategoryIcon,
    } = data;

    console.log(data);

    if (!org_id || !admin_id || !menu_item_id) {
      throw new Error("menu_item_id is required");
    }

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      if (Barcode) {
        const existing = await menuItemModel.findOne({
          org_id,
          "menuItems.Barcode": Barcode,
          "menuItems._id": { $ne: menu_item_id }, // exclude current item
        });

        if (existing) {
          throw new Error("Barcode already exists in another menu item");
        }
      }
      const updatedMenuItem = await menuItemModel.findOneAndUpdate(
        { "menuItems._id": menu_item_id },
        {
          "menuItems.$.menuName": menuName, // Update fields inside the matched array element
          "menuItems.$.description": description,
          "menuItems.$.price": price,
          "menuItems.$.menuImg": menuImg,
          "menuItems.$.Barcode": Barcode,
          "menuItems.$.menuType": menuType,
          "menuItems.$.Category": Category,
          // "menuItems.$.CategoryIcon": CategoryIcon,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Validate before updating
        }
      );

      if (!updatedMenuItem) {
        throw new Error("Menu item not found");
      }

      return updatedMenuItem;
    } catch (error) {
      console.error("Error in menuitemUpdate service:", error);
      throw error;
    }
  },

  //=================================
  updateMenuname: async (data) => {
    const {
      admin_id,
      org_id,
      menuName,
      description,
      price,
      menuImg,
      Barcode,
      Category,
      CategoryIcon,
    } = data;
    try {
      const changeMenuitemDetails = await menuItemModel.findOneAndUpdate(
        {
          menuName,
          org_id,
        },
        {
          $set: {
            description,
            price,
            menuImg,
            menuName,
            Barcode,
            Category,
            CategoryIcon,
          },
        },
        {
          new: true,
        }
      );
      return changeMenuitemDetails;
    } catch (error) {
      throw error;
    }
  },
  //=================================
  deleteMenuitem: async (data) => {
    const { admin_id, org_id, menu_item_id } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const removeMenuitem = await menuItemModel.findOneAndDelete({
        menu_item_id,
        org_id,
      });
      if (!removeMenuitem) {
        throw new Error("not found");
      }
      return removeMenuitem;
    } catch (error) {
      throw error;
    }
  },
  //   ===========================
  // register:async(data)=>{
  //     const {Admin_id,App_id,UserName,Password}=data;
  //     try{
  //       const userDetails=await registerModel.create({
  //         Admin_id,
  //         App_id,
  //         UserName,
  //         Password
  //       });
  //       return userDetails;
  //     }catch(error){
  //       throw error;
  //     }
  //   },
  //=============================
  updateUserdetails: async (data) => {
    const { user_id, admin_id, App_id, UserName, Password } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const updateUserdetails = await registerModel.findByIdAndUpdate(
        user_id,
        {
          admin_id,
          App_id,
          UserName,
          Password,
        },
        {
          new: true,
        }
      );
      return updateUserdetails;
    } catch (error) {
      throw error;
    }
  },
  //============================
  deleteuserdetails: async (data) => {
    const { user_id, org_id } = data;
    try {
      const deletedetails = await registerModel.findOneAndDelete({
        user_id,
        org_id,
      });
      if (!deletedetails) {
        throw {
          error: "not found",
        };
      }
      return deletedetails;
    } catch (error) {
      throw error;
    }
  },
  //===================================
  createRoomcategory: async (data) => {
    const { admin_id, org_id, rooms } = data;
    if (!admin_id || !org_id) {
      throw new Error("both id required");
    }
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const category = await roomstableModel.create({
        admin_id,
        org_id,
        rooms,
      });
      return category;
    } catch (error) {
      throw error;
    }
  },
  //===============================================
  getRoomsAndTables: async (data) => {
    const { org_id } = data;
    try {
      if (!org_id) {
        throw new Error("Admin_id is required");
      }
      const getroomsandtableDetails = await roomstableModel.find({ org_id });
      console.log("Query Result:", getroomsandtableDetails);

      return getroomsandtableDetails;
    } catch (error) {
      console.error("Error in getRoomsAndTables service:", error);
      throw error;
    }
  },

  //==============================================
  getOverAllroomsAndtables: async () => {
    try {
      const getoverallSubroomsandTables = await roomstableModel.find();
      return getoverallSubroomsandTables;
    } catch (error) {
      throw error;
    }
  },
  //===============================================
  updatesubroomsandtable: async (data) => {
    const { tablerooms_id, admin_id, org_id, rooms } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const existingRoom = await roomstableModel.findOne({
        _id: tablerooms_id,
        org_id,
      });

      if (!existingRoom) {
        throw new Error("Room not found for this organization");
      }

      const updateDetails = await roomstableModel.findByIdAndUpdate(
        tablerooms_id,
        { rooms },
        { new: true }
      );

      return updateDetails;
    } catch (error) {
      console.error("Service Error in updatesubroomsandtable:", error.message);
      throw error;
    }
  },

  //   ======================================
  iconandNameCreated: async (data) => {
    const { iconImage, iconName } = data;
    try {
      const createLogoandName = await iconModel.create({
        iconImage,
        iconName,
      });
      return createLogoandName;
    } catch (error) {
      throw new error();
    }
  },
  //=======================================
  geticon: async (icon_id) => {
    try {
      const getIddetails = await iconModel.findById(icon_id);
      return getIddetails;
    } catch (error) {
      throw error;
    }
  },
  //========================================
  getOverallDetails: async () => {
    try {
      const getAlldetails = await iconModel.find();
      return getAlldetails;
    } catch (error) {
      throw new error();
    }
  },
  //========================================
  updateIcon: async (data) => {
    const { icon_id, iconImage, iconName } = data;
    try {
      const updateOnlyId = await iconModel.findByIdAndUpdate(
        icon_id,
        {
          iconImage,
          iconName,
        },
        {
          new: true,
        }
      );
      return updateOnlyId;
    } catch (error) {
      throw new error();
    }
  },
  //=====================================
  deleteIcon: async (icon_id) => {
    try {
      const deleteIcon = await iconModel.findByIdAndDelete(icon_id);
      console.log(deleteIcon);
      if (!deleteIcon) {
        throw new Error("Icon not found.");
      }
      return "deleted";
    } catch (error) {
      throw error;
    }
  },
  // ===============================
  sendEmailService: async (email, link) => {
    if (!email) {
      throw new Error("Recipient email is required");
    }

    const emailTemplate = `
<div class="email-container" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
  <!-- Header -->
  <div class="header" style="background-color: #ff5e5e; padding: 20px; text-align: center; color: #ffffff; min-height: 200px; background-image: url('cid:mailbg');">
    <h1 style="margin: 0; font-size: 28px;">Elude Fertile</h1>
    <p style="margin: 10px 0 0; font-family: Inter; font-size: 14px; font-weight: 400; line-height: 24px; text-align: center;">
      Join more than 85,000 professionals that have already registered. Get exclusive product update reveals.
    </p>
  </div>

  <!-- Main Content -->
  <div class="main-content" style="padding: 20px; text-align: center;">
    <h2 style="font-size: 22px; color: #333333; font-family: Inter; font-weight: bold; line-height: 24px; text-align: center;">
      Elevate '22 is happening this Thursday.<br>Register now or lose the opportunity!
    </h2>
    <p style="font-size: 16px; color: #666666; line-height: 1.5; font-family: Inter; font-weight: 400; text-align: center;">
      Join more than 85,000 professionals that have already registered. Get exclusive product update reveals and
      critical insights from world-renowned leaders, like Robin Sharma, on how to navigate the future of work.
    </p>
    <a href="http://localhost:8100/admin/setPassword" class="cta-button" style="background-color: #ff5e5e; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 30px; display: inline-block; margin: 20px 0; font-size: 16px;">
      Click The Link
    </a>
    <p style="font-size: 14px; font-family: Inter; font-weight: 400; line-height: 24px; text-align: center;">
      I understand that clicking this button registers me to the Elevate 2022 event, and I approve the Elevate Terms
      and Conditions and monday.com's Privacy Policy.
    </p>
  </div>

  <!-- Secondary Content -->
  <div class="secondary-content" style="padding: 20px; background-color: #F0F3FF; text-align: center; color: #666666;">
    <p style="font-family: Inter; font-size: 14px; font-weight: 400; line-height: 24px; text-align: center; color: #595AD4;">
      Oh, and all Elevate '22 attendees will automatically be added to a raffle for the chance to win a free iPhone 14
      or Oculus 2!
    </p>
    <p><a style="color: grey; text-decoration: none;">Click here to read the full terms and conditions</a></p>
  </div>

  <!-- Footer -->
  <div class="footer" style="padding: 20px; background-color: #F0F3FF; text-align: center; color: #888888; border-top: 1px solid #d5d5d5;">
    <div class="social-icons" style="margin-top: 15px;">
      <a><img src="cid:facebook" alt="Facebook" style="width: 24px; height: 24px; margin: 0 5px;"></a>
      <a><img src="cid:instagram" alt="Instagram" style="width: 24px; height: 24px; margin: 0 5px;"></a>
      <a><img src="cid:tiktok" alt="TikTok" style="width: 24px; height: 24px; margin: 0 5px;"></a>
      <a><img src="cid:linkedin" alt="LinkedIn" style="width: 24px; height: 24px; margin: 0 5px;"></a>
    </div>
  </div>
</div>
`;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Here is your link",
      text: `Click the following link: ${link}`,
      html: emailTemplate, // html body
      attachments: [
        {
          filename: "mail-bg.png",
          path: path.join(__dirname, "..", "images", "mailBg.png"),
          cid: "mailbg", // same cid value as in the html img src
        },
        {
          filename: "Facebook.png",
          path: path.join(__dirname, "..", "images", "Facebook.png"),
          cid: "facebook",
        },
        {
          filename: "insta.png",
          path: path.join(__dirname, "..", "images", "insta.png"),
          cid: "instagram",
        },
        {
          filename: "tic.png",
          path: path.join(__dirname, "..", "images", "tic.png"),
          cid: "tiktok",
        },
        {
          filename: "in.png",
          path: path.join(__dirname, "..", "images", "in.png"),
          cid: "linkedin",
        },
      ],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    });
  },

  getallCategoryStock: async (
    ProductImage,
    ProductName,
    ProductCatagory,
    Price
  ) => {
    try {
      const filter = {};

      if (ProductImage) {
        filter.ProductImage = ProductImage;
        console.log("Product Image:", filter.ProductImage);
        const productImages = await ProductModel.find(filter);
        console.log(productImages);
        return productImages;
        //return allOrderItems.map(item => ({ order_item_id: order_item_id}));
      }
      if (ProductName) {
        filter.ProductName = ProductName;
        console.log("Product Name:", filter.ProductName);
        const productNames = await ProductModel.find(filter);
        console.log(productNames);
        return productNames; //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (ProductCatagory) {
        filter.ProductCatagory = ProductCatagory;
        console.log("Fetching by order_id:", filter.ProductCatagory);
        const catagoryProduct = await ProductModel.find(filter);
        console.log(catagoryProduct);
        return catagoryProduct; //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (Price) {
        filter.Price = Price;
        console.log("Fetching by order_id:", filter.Price);
        const PriceProduct = await ProductModel.find(filter);
        console.log(PriceProduct);
        return PriceProduct; //return allOrderItems.map(item => ({ order_id: order_id}));
      }
      if (Object.keys(filter).length === 0) {
        throw new Error("No valid filter criteria provided");
      }

      //const allOrderItems = await orderItemModel.find(filter);
      //return allOrderItems.map(item => ({ product_id: item.product_id }));
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  },
  //=========================================================

  getOverallOrder: async () => {
    try {
      const overallOrders = await orderModel.find();
      return overallOrders;
    } catch (error) {
      throw new error();
    }
  },
  //===========================================
  gatallOrderItems: async () => {
    try {
      const overallOrderItem = await orderItemModel.find();
      return overallOrderItem;
    } catch (error) {
      throw new error();
    }
  },
  //==============================================
  getallCustomers: async () => {
    try {
      const overallCustomers = await customerModel.find();
      return overallCustomers;
    } catch (error) {
      throw new error();
    }
  },
  //=========================================
  getallPayments: async () => {
    try {
      const overallPayments = await paymentModel.find();
      return overallPayments;
    } catch (error) {
      throw new error();
    }
  },
  //=========================================
  getallReceipts: async () => {
    try {
      const overallReceipts = await receiptsModel.find();
      return overallReceipts;
    } catch (error) {
      throw new error();
    }
  },
  //=======================================
  getallSalesReport: async () => {
    try {
      const overallSalesReceipts = await salesReportModel.find();
      return overallSalesReceipts;
    } catch (error) {
      throw new error();
    }
  },
  //=============================================
  getAllLoyaltyPrograms: async () => {
    try {
      const overallLoyaltyPrograms = await loyaltyProgramsModel.find();
      return overallLoyaltyPrograms;
    } catch (error) {
      throw new error();
    }
  },
  //=====================================
  getallTables: async () => {
    try {
      const getAlltables = await TablesModels.find();
      return getAlltables;
    } catch (error) {
      throw new error();
    }
  },
  //=============================================
  getMenuitem: async (menu_item_id) => {
    try {
      const getmenuId = await menuItemModel.findOne(
        { "menuItems._id": menu_item_id },
        {
          "menuItems.$": 1,
          menu_Category_id: 1,
        }
      );
      if (!getmenuId) {
        throw new Error("Menu item not found");
      }

      const { menu_Category_id } = getmenuId;
      const categoryDetails = await menuCategoryModel.findById(
        menu_Category_id
      );

      if (!categoryDetails) {
        throw new Error("Category details not found");
      }

      const menuItemWithCategory = {
        ...getmenuId.menuItems[0]._doc,
        Category: categoryDetails.Category,
      };

      return menuItemWithCategory;
    } catch (error) {
      console.error("Error in getMenuitem service:", error);
      throw error;
    }
  },

  //========================================
  deleteMenu: async (data) => {
    const { menu_item_id, org_id } = data;
    try {
      const updatedDoc = await menuItemModel.findOneAndUpdate(
        { "menuItems._id": menu_item_id, org_id },
        { $pull: { menuItems: { _id: menu_item_id } } },
        { new: true }
      );

      if (!updatedDoc) {
        return "Menu item not found";
      }

      // Step 2: Check if the menuItems array is now empty
      if (updatedDoc.menuItems.length === 0) {
        await menuItemModel.findByIdAndDelete(updatedDoc._id);
        return "Deleted successfully and parent document removed as it was empty";
      }

      return "Deleted successfully";

      // const updatedMenu = await menuItemModel.findOneAndUpdate(
      //   { "menuItems._id": menu_item_id, org_id },
      //   { $pull: { menuItems: { _id: menu_item_id } } },
      //   { new: true }
      // );

      // if (!updatedMenu) {
      //   return "Menu item not found";
      // }

      // if (!updatedMenu.menuItems || updatedMenu.menuItems.length === 0) {
      //   await menuCategoryModel.findByIdAndDelete(updatedMenu.menu_Category_id);

      //   await menuItemModel.findByIdAndDelete(updatedMenu._id);

      //   return "Menu item deleted, and category removed as it had no more items";
      // }

      // return "Menu item deleted successfully";
    } catch (error) {
      throw new Error(
        "An error occurred while deleting the menu item: " + error.message
      );
    }
  },
  //==========================================
  MenuitemCategory: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("organization not found");
      }
      const productCategories = await menuItemModel.find(
        { org_id },
        "menu_item_id menu_Category_id menuItems"
      );
      console.log("Product Categories:", productCategories);

      const categories = await menuCategoryModel.find(
        { org_id },
        "menu_Category_id Category CategoryIcon"
      );
      console.log("Categories:", categories);

      const uniqueCategoriesMap = new Map();

      productCategories.forEach((product) => {
        const category = categories.find(
          (cat) =>
            String(cat.menu_Category_id) === String(product.menu_Category_id)
        );

        console.log("Product menu_Category_id:", product.menu_Category_id);
        console.log("Matching Category:", category); // Ensure this is not undefined

        if (category && !uniqueCategoriesMap.has(category.menu_Category_id)) {
          // Log what is being added
          console.log("Adding to map:", {
            menu_item_id: product.menu_item_id,
            Category: category.Category,
            CategoryIcon: category.CategoryIcon,
          });

          uniqueCategoriesMap.set(category.menu_Category_id, {
            menu_item_id: product.menu_item_id,
            menuItems:product.menuItems,
            Category: category.Category, 
            CategoryIcon: category.CategoryIcon,
            menu_Category_id: category.menu_Category_id,
          });
        }
      });

      console.log("Final Unique Categories Map:", uniqueCategoriesMap);

      const uniqueCategories = Array.from(uniqueCategoriesMap.values());
      console.log("Unique Product Categories:", uniqueCategories);

      return uniqueCategories;
    } catch (error) {
      console.error("Error fetching unique product categories:", error);
      throw error;
    }
  },

  //==========================================
  memberRegistation: async (data) => {
    const {
      Member_id,
      MemberName,
      CardNo,
      Address,
      ContactNo,
      RegisterdDate,
      Status,
    } = data;
    try {
      const registerMember = await memberRegistationModel.create({
        Member_id,
        MemberName,
        CardNo,
        Address,
        ContactNo,
        RegisterdDate,
        Status,
      });
      return registerMember;
    } catch (error) {
      throw error;
    }
  },
  //==============================================
  updateRegistation: async (data) => {
    const {
      member_id,
      Member_id,
      MemberName,
      CardNo,
      Address,
      ContactNo,
      RegisterdDate,
      Status,
    } = data;
    try {
      const updateMember = await memberRegistationModel.findByIdAndUpdate(
        member_id,
        {
          Member_id,
          MemberName,
          CardNo,
          Address,
          ContactNo,
          RegisterdDate,
          Status,
        },
        {
          new: true,
        }
      );
      return updateMember;
    } catch (error) {
      throw new error();
    }
  },
  //===========================================
  deleteRegistation: async (data) => {
    const { Member_id, org_id } = data;
    try {
      const deleteMember = await memberRegistationModel.findOneAndDelete({
        Member_id,
        org_id,
      });
      return deleteMember;
    } catch (error) {
      throw error;
    }
  },
  //=====================================

  //=======================================================
  updateProductEntry: async (data) => {
    const {
      admin_id,
      org_id,
      ProductEntry_id,
      ProductName,
      Category,
      Unit,
      Price,
      StorageType,
      Kitchen,
      quantity,
      ProductCode,
      ReorderPoint,
      Description,
      ExpiryDate,
    } = data;
    try {
      const updateEntryProduct = await productEntryModel.findByIdAndUpdate(
        ProductEntry_id,
        {
          ProductName,
          ProductName,
          Category,
          Unit,
          Price,
          StorageType,
          Kitchen,
          quantity,
          ProductCode,
          ReorderPoint,
          Description,
          ExpiryDate,
        },
        { new: true }
      );
      return updateEntryProduct;
    } catch (error) {
      throw error;
    }
  },
  //===========================================

  //==========================================
  notesMaster: async (data) => {
    const { admin_id, org_id, noteMaster } = data;
    if (!admin_id || !org_id || !noteMaster) {
      throw new Error("both fields are required");
    }
    try {
      const notesMaster = await notesmasterModel.create({
        admin_id,
        org_id,
        noteMaster,
      });
      return notesMaster;
    } catch (error) {
      throw error;
    }
  },
  //===========================================
  updateNotesmaster: async (data) => {
    const { noteMaster_id, noteMaster, admin_id, org_id } = data;
    if (!admin_id || !org_id || !noteMaster_id) {
      throw new Error("both fields are required");
    }
    try {
      const editNotemaster = await notesmasterModel.findOneAndUpdate(
        { _id: noteMaster_id, org_id },
        { noteMaster },
        { new: true }
      );
      // const editNotemaster = await notesmasterModel.findByIdAndUpdate(
      //   noteMaster_id,
      //   {
      //     noteMaster,
      //   },
      //   {
      //     new: true,
      //   }
      // );
      return editNotemaster;
    } catch (error) {
      throw error;
    }
  },
  //============================================

  deleteNotemaster: async (data) => {
    const { noteMaster_id, org_id } = data;
    try {
      const deleteNotemaster = await notesmasterModel.findOneAndDelete({
        _id: noteMaster_id,
        org_id,
      });
      return deleteNotemaster;
    } catch (error) {
      throw error;
    }
  },

  //=============================================
  getallmembers: async () => {
    try {
      const overallMember = await memberRegistationModel.find();
      return overallMember;
    } catch (error) {
      throw error;
    }
  },
  //==================================================

  //=================================================
  getallNotemaster: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const overallNotemaster = await notemasterModel.find({ org_id });
      return overallNotemaster;
    } catch (error) {
      throw error;
    }
  },
  //======================================================
  createGst: async (data) => {
    const { ProductCatagory, gst, ServiceCharges } = data;

    try {
      // Check if ProductCatagory exists in the Product model
      const product = await ProductModel.findOne({ ProductCatagory });

      if (!product) {
        // If product is not found, throw an error
        throw {
          statusCode: 404,
          message: `Product category '${ProductCatagory}' does not exist.`,
        };
      }

      // Create GST entry since ProductCatagory is valid
      const gstCreate = await gstModel.create({
        ProductCatagory,
        gst,
        ServiceCharges,
      });

      return gstCreate;
    } catch (error) {
      // Handle different error types
      if (error.statusCode) {
        // If it's a custom error, throw it directly
        throw error;
      }
      // Otherwise, throw a generic error
      throw {
        statusCode: 500,
        message: "An error occurred while creating GST entry.",
        error: error.message,
      };
    }
  },
  //============================================
  getallGst: async (org_id) => {
    try {
      console.log(org_id);
      const getOverallGst = await organizationModel.findOne({ _id: org_id });
      return getOverallGst;
    } catch (error) {
      throw error;
    }
  },
  //==================================================
  updateGst: async (data) => {
    const { admin_id, org_id, Gst, ServiceCharges } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("admin not found");
      }
      const updateGst = await organizationModel.findByIdAndUpdate(
        org_id,
        { Gst },
        { new: true }
      );
      return updateGst;
    } catch (error) {
      throw error;
    }
  },
  //======================================================
  deleteGst: async (_id) => {
    try {
      const existingRecords = await gstModel.find({ _id: { $in: _id } });

      if (existingRecords.length === 0) {
        return { deletedCount: 0 };
      }

      const deleteResult = await gstModel.deleteMany({ _id: { $in: _id } });

      return { deletedCount: deleteResult.deletedCount };
    } catch (error) {
      throw new Error(`Failed to remove kitchen IDs: ${error.message}`);
    }
  },

  // =========================
  deliveryPartners: async (data) => {
    const {
      admin_id,
      org_id,
      AppLink,
      AppName,
      AppIcon,
      Description,
      KeyFeatures,
    } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const deliveryPartners = await deliveryPartnerModel.create({
        org_id,
        AppLink,
        AppName,
        AppIcon,
        Description,
        KeyFeatures,
        activate_id: "",
      });

      return {
        deliveryPartners,
      };
    } catch (error) {
      throw error;
    }
  },
  // ===========================
  getDeliveryPartners: async (_id) => {
    console.log(_id);
    try {
      const getDeliveryPartners = await deliveryPartnerModel.findById(_id);
      return getDeliveryPartners;
    } catch (error) {
      throw error;
    }
  },
  // =========================
  getAllDeliveryPartners: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getAllDeliveryPartners = await deliveryPartnerModel.find({
        org_id,
      });
      return getAllDeliveryPartners;
    } catch (error) {
      throw error;
    }
  },
  // ==========================
  UpdatedeliveryPartners: async (data) => {
    const {
      admin_id,
      deliveryPartner_id,
      AppLink,
      AppName,
      AppIcon,
      Description,
      KeyFeatures,
    } = data;
    try {
      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        return { message: "admin not found" };
      }
      const UpdatedeliveryPartners =
        await deliveryPartnerModel.findByIdAndUpdate(
          deliveryPartner_id,
          {
            AppLink,
            AppName,
            AppIcon,
            Description,
            KeyFeatures,
          },
          {
            new: true,
          }
        );
      return UpdatedeliveryPartners;
    } catch (error) {
      throw error;
    }
  },
  // ==============
  ThirdPartyActivate: async (data) => {
    const {
      deliveryPartner_id,
      tie_up,
      Vendor_code,
      no_of_order_perday,
      contact_NO,
      Email,
      Add_Gst,
      packing_charge,
      upload_menu,
      queries,
    } = data;
    try {
      const activate = await ThiedPartyActiveModel.create({
        tie_up,
        Vendor_code,
        contact_NO,
        Email,
        no_of_order_perday,
        Add_Gst,
        packing_charge,
        upload_menu,
        queries,
      });

      const updatedeliveryPartners =
        await deliveryPartnerModel.findOneAndUpdate(
          { _id: deliveryPartner_id },
          { activate_id: activate._id },
          { new: true }
        );
      return { activate, updatedeliveryPartners };
    } catch (error) {
      throw error;
    }
  },
  // ================
  getThirdParty: async (_id) => {
    console.log(_id);
    try {
      const getThirdParty = await ThiedPartyActiveModel.findById(_id);
      return getThirdParty;
    } catch (error) {
      throw error;
    }
  },
  // ========================
  getAllThirdParty: async () => {
    try {
      const getAllThirdParty = await ThiedPartyActiveModel.find();
      return getAllThirdParty;
    } catch (error) {
      throw error;
    }
  },
  // ========================
  onlineCustomer: async (data) => {
    const {
      admin_id,
      org_id,
      orderFrom,
      orderLogo,
      Hotel_Name,
      Hotel_Phn_no,
      cust_Name,
      cust_phn_no,
      ReasonTo_reject,
      OTP,
      Address,
      order_status,
      payment_method,
      menu,
      delivery_Person,
    } = data;
    try {
      const deliveryPersonWithId = {
        ...delivery_Person,
        _id: new mongoose.Types.ObjectId(),
      };

      console.log(deliveryPersonWithId);

      const menuWithId = menu.map((item) => ({
        ...item,
        _id: new mongoose.Types.ObjectId(),
      }));

      console.log(menuWithId);
      const onlineCustomer = await orderModel.create({
        admin_id,
        org_id,
        orderFrom,
        orderLogo,
        Hotel_Name,
        Hotel_Phn_no,
        cust_Name,
        cust_phn_no,

        OTP,
        ReasonTo_reject,
        Address,
        order_status,
        payment_method,
        delivery_Person: deliveryPersonWithId,
        menu: menuWithId,
      });

      return { onlineCustomer, delivery_Person, menu };
    } catch (error) {
      throw error;
    }
  },
  // ===================
  updateOrderStatus: async (data) => {
    const { Online_order_id, org_id } = data;
    console.log(data, "Online_order_id");
    try {
      const updatedOrder = await orderModel.findOneAndUpdate(
        {
          Online_order_id: Online_order_id,
          org_id,
        },
        { order_status: data.order_status },
        { new: true }
      );

      if (!updatedOrder) {
        throw new Error("Order not found");
      }

      return updatedOrder;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // =====================
  getonlineCustomer: async (Onlin_order_id) => {
    console.log(Onlin_order_id);
    try {
      const getonlineCustomer = await orderModel.findById(Onlin_order_id);
      return getonlineCustomer;
    } catch (error) {
      throw error;
    }
  },
  // =================
  // getAllonlineCustomer: async () => {
  //   try {
  //     const getAllonlineCustomer = await orderModel.find();
  //     return getAllonlineCustomer;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // getAllonlineCustomer: async (data) => {
  //   const { orderFrom, order_status, fromDate } = data;

  //   try {
  //     const query = {};

  //     if (order_status) {
  //       query.order_status = order_status;
  //     }

  //     // if (orderFrom) {
  //     //   query.orderFrom = orderFrom;
  //     // }

  //     if (orderFrom && orderFrom !== "All") {
  //       query.orderFrom = orderFrom;
  //     }

  //     if (fromDate) {
  //       const from = new Date(fromDate + "T00:00:00.000Z");
  //       const to = new Date(from.getTime() + 24 * 60 * 60 * 1000);

  //       query.timestramp = {
  //         $gte: from,
  //         $lt: to,
  //       };
  //     }

  //     const getOnlineCustomer = await orderModel.find(query);
  //     return getOnlineCustomer;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  getAllonlineCustomer: async (data) => {
    const { org_id, orderFrom, order_status, fromDate } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");

      const query = { org_id };

      if (order_status && order_status !== "All") {
        query.order_status = order_status;
      }

      if (orderFrom && orderFrom !== "All") {
        query.orderFrom = orderFrom;
      }

      if (fromDate) {
        const from = new Date(`${fromDate}T00:00:00.000Z`);
        const to = new Date(from.getTime() + 24 * 60 * 60 * 1000);
        query.timestramp = { $gte: from, $lt: to };
      }

      // Fetch filtered data
      const dataList = await orderModel.find(query);

      // Count total
      const count = dataList.length;

      // Prepare statusCount defaults
      const defaultStatuses = [
        "newOrder",
        "Confirmed",
        "Cancelled",
        "Completed",
      ];
      let statusCountObj = Object.fromEntries(
        defaultStatuses.map((s) => [s, 0])
      );

      // Aggregate count by status using same filters
      const statusCountAgg = await orderModel.aggregate([
        {
          $match: {
            org_id: new mongoose.Types.ObjectId(org_id),
            ...(orderFrom && orderFrom !== "All" && { orderFrom }),
            ...(fromDate && {
              timestramp: {
                $gte: new Date(`${fromDate}T00:00:00.000Z`),
                $lt: new Date(
                  new Date(`${fromDate}T00:00:00.000Z`).getTime() +
                    24 * 60 * 60 * 1000
                ),
              },
            }),
          },
        },
        {
          $group: {
            _id: "$order_status",
            count: { $sum: 1 },
          },
        },
      ]);

      // Fill status count
      statusCountAgg.forEach(({ _id, count }) => {
        if (defaultStatuses.includes(_id)) {
          statusCountObj[_id] = count;
        }
      });

      return {
        count,
        statusCount: statusCountObj,
        data: dataList,
      };
    } catch (error) {
      console.error("getAllonlineCustomer Error:", error);
      throw error;
    }
  },

  // ======================
  getLowStock: async (data) => {
    const { org_id } = data;
    console.log(data);
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const lowStockProducts = await ProductModel.find({
        org_id: org_id,
        $expr: {
          $and: [
            { $lt: ["$stock_quantity", "$minStock"] },
            { $gt: ["$stock_quantity", 0] },
          ],
        },
      });
      return lowStockProducts.map((product) => ({
        stock_quantity: product.stock_quantity,
        ProductName: product.ProductName,
        timestamp: product.timestamp,
      }));
    } catch (error) {
      throw error;
    }
  },

  // ============\

  outOfStock: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }

      const query = {
        org_id: org_id,
        stock_quantity: 0,
      };
      const outOfStockProducts = await ProductModel.find(query);

      return outOfStockProducts.map((product) => ({
        stock_quantity: product.stock_quantity,
        ProductName: product.ProductName,
        timestamp: product.timestamp,
      }));
    } catch (error) {
      throw error;
    }
  },

  // =========================
  getdeliverPartner: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getdeliverPartner = await orderModel.aggregate([
        {
          // $match: { org_id: org_id },
          $match: { org_id: new mongoose.Types.ObjectId(org_id) },
        },
        {
          $group: {
            _id: "$orderFrom",
            count: { $sum: 1 },
            orderLogo: { $first: "$orderLogo" },
            timestramp: { $first: "$timestramp" },
          },
        },
        {
          $project: {
            _id: 0,
            orderFrom: "$_id",
            orderLogo: "$orderLogo",
            count: "$count",
            timestramp: "$timestramp",
          },
        },
      ]);
      return getdeliverPartner;
    } catch (error) {
      throw error;
    }
  },

  // ===============================
  getEmployeeCount: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const results = await userRegModel.aggregate([
        {
          $facet: {
            statusCounts: [
              {
                $match: {
                  org_id: org_id,
                  Userstatus: { $in: ["Active", "Leave", "Terminated"] },
                },
              },
              {
                $group: {
                  _id: "$Userstatus",
                  count: { $sum: 1 },
                  timestamp: { $first: "$timestamp" },
                },
              },
              {
                $project: {
                  _id: 0,
                  Userstatus: "$_id",
                  count: "$count",
                  timestamp: "$timestamp",
                },
              },
            ],
            totalCount: [
              {
                $match: {
                  org_id: org_id,
                },
              },
              { $count: "total" },
            ],
          },
        },
      ]);

      const statusCounts = results[0].statusCounts;
      const totalCount = results[0].totalCount[0]
        ? results[0].totalCount[0].total
        : 0;

      return { totalCount, statusCounts };
    } catch (error) {
      throw error;
    }
  },
  // ===================
  /* getPopularDish: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const popularDishes = await userOrderModel.aggregate([
        {
          $match: {
            org_id: org_id,
            timestamp: { $gte: startOfDay, $lte: endOfDay },
          },
        },

        { $unwind: "$Dishes" },

        {
          $group: {
            _id: {
              menu_item_id: "$Dishes.menu_item_id",
              menuName: "$Dishes.menuName",
              menuImg: "$Dishes.menuImg",
            },
            count: { $sum: "$Dishes.quantity" },
            timestamp: { $first: "$timestamp" },
          },
        },

        { $sort: { count: -1 } },

        { $limit: 5 },

        {
          $project: {
            _id: 0,
            menu_item_id: "$_id.menu_item_id",
            menuName: "$_id.menuName",
            menuImg: "$_id.menuImg",
            count: 1,
            timestamp: 1,
          },
        },
      ]);
      return popularDishes;
    } catch (error) {
      throw error;
    }
  }, */

  getPopularDish: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType);

      const matchQuery = { org_id };
      // if (Object.keys(dateFilter).length > 0) {
      //   matchQuery.timestamp = dateFilter;
      // }
      if (dateFilter?.$gte || dateFilter?.$lt) {
        matchQuery.timestamp = dateFilter;
      }

      const popularDishes = await userOrderModel.aggregate([
        { $match: matchQuery },

        { $unwind: "$Dishes" },

        {
          $group: {
            _id: {
              menu_item_id: "$Dishes.menu_item_id",
              menuName: "$Dishes.menuName",
              menuImg: "$Dishes.menuImg",
            },
            count: { $sum: "$Dishes.quantity" },
            timestamp: { $first: "$timestamp" },
          },
        },

        { $sort: { count: -1 } },

        { $limit: 5 },

        {
          $project: {
            _id: 0,
            menu_item_id: "$_id.menu_item_id",
            menuName: "$_id.menuName",
            menuImg: "$_id.menuImg",
            count: 1,
            timestamp: 1,
          },
        },
      ]);

      return popularDishes;
    } catch (error) {
      console.error("Error in getPopularDish:", error);
      throw error;
    }
  },

  // ==============
  /*  getCustomerCount: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const customerCounts = await customerModel.aggregate([
        {
          $match: {
            org_id: org_id,
            cust_status: { $in: ["Old", "New"] },
          },
        },
        {
          $group: {
            _id: "$cust_status",
            count: { $sum: 1 },
            Date: { $first: "$Date" },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: "$count",
            Date: "$Date",
          },
        },
      ]);

      const result = {
        Old: customerCounts.find((c) => c.status === "Old") || {
          count: 0,
          timestamp: null,
        },
        New: customerCounts.find((c) => c.status === "New") || {
          count: 0,
          timestamp: null,
        },
      };

      return result;
    } catch (error) {
      console.error("Error retrieving customer counts:", error);
      throw error;
    }
  }, */

  getCustomerCount: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }

      const dateFilter = adminService.getDateFilter(filterType); // must return {$gte, $lt}

      const matchQuery = {
        org_id,
        cust_status: { $in: ["Old", "New"] },
      };

      // ✅ Add Date filter after validation
      if (Object.keys(dateFilter).length > 0) {
        matchQuery.Date = dateFilter;
      }

      // ✅ Log full query
      console.log("✅ Final Match Query:", matchQuery);

      const customerCounts = await customerModel.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: "$cust_status",
            count: { $sum: 1 },
            Date: { $first: "$Date" },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: "$count",
            Date: "$Date",
          },
        },
      ]);

      const result = {
        Old: {
          count: customerCounts.find((c) => c.status === "Old")?.count || 0,
          timestamp:
            customerCounts.find((c) => c.status === "Old")?.Date || null,
        },
        New: {
          count: customerCounts.find((c) => c.status === "New")?.count || 0,
          timestamp:
            customerCounts.find((c) => c.status === "New")?.Date || null,
        },
      };

      return result;
    } catch (error) {
      console.error("Error retrieving customer counts:", error);
      throw error;
    }
  },

  // ===================
  /* getCustomer: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear + 1, 0, 1);

      const customersByMonth = await customerModel.aggregate([
        {
          $match: {
            org_id: org_id,
            Date: { $gte: startOfYear, $lt: endOfYear },
          },
        },
        {
          $group: {
            _id: { month: { $month: "$Date" } },
            count: { $sum: 1 },
            Date: { $first: "$Date" },
          },
        },
        {
          $project: {
            month: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id.month", 5] }, then: "May" },
                  { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
                ],
                default: "Unknown",
              },
            },
            count: 1,
            Date: 1,
          },
        },
        {
          $sort: { "_id.month": 1 }, // Sort by month in ascending order
        },
      ]);

      return customersByMonth;
    } catch (error) {
      console.error(
        "Error retrieving customer counts for the current year:",
        error
      );
      throw error;
    }
  }, */

  /*  getCustomer: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType);

      const matchQuery = { org_id };
      if (Object.keys(dateFilter).length > 0) {
        matchQuery.Date = dateFilter; // assumes 'Date' is customer creation date
      }

      const customersByMonth = await customerModel.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: { month: { $month: "$Date" } },
            count: { $sum: 1 },
            Date: { $first: "$Date" },
          },
        },
        {
          $project: {
            month: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id.month", 5] }, then: "May" },
                  { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
                ],
                default: "Unknown",
              },
            },
            count: 1,
            Date: 1,
          },
        },
        { $sort: { "_id.month": 1 } },
      ]);

      return customersByMonth;
    } catch (error) {
      console.error("Error retrieving customers by month:", error);
      throw error;
    }
  }, */

  /*  getCustomer: async (data) => {
  const { org_id, filterType } = data;

  try {
    const org = await organizationModel.findById(org_id);
    if (!org) throw new Error("org not found");

    const customers = await customerModel
      .find({ org_id })
      .sort({ Date: 1 }); // ensure sorted for cumulative count

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Helper to format date as `YYYY-MM`
    const getMonthKey = (date) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    };

    // Step 1: Group customers by month
    const groupedByMonth = {};
    customers.forEach((customer) => {
      const key = getMonthKey(customer.Date);
      if (!groupedByMonth[key]) {
        groupedByMonth[key] = [];
      }
      groupedByMonth[key].push(customer);
    });

    // Step 2: Get all months in order
    const allMonths = Object.keys(groupedByMonth).sort();

    let cumulative = 0;
    const result = [];

    allMonths.forEach((key) => {
      const newCount = groupedByMonth[key].length;
      cumulative += newCount;

      // Convert key to readable format like "Jul-2025"
      const [year, month] = key.split("-");
      const readableLabel = `${monthNames[Number(month) - 1]}-${year}`;

      result.push({
        label: readableLabel,
        newCustomers: newCount,
        currentCustomers: cumulative,
      });
    });

    return result;
  } catch (error) {
    console.error("Error in getCustomer:", error);
    throw error;
  }
}, */

  getCustomer: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType); // 👉 returns { $gte: startDate }
      const query = { org_id };

      if (Object.keys(dateFilter).length > 0) {
        query.Date = dateFilter;
      }

      const customers = await customerModel.find(query).sort({ Date: 1 });

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const getMonthKey = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      };

      const groupedByMonth = {};
      customers.forEach((customer) => {
        const key = getMonthKey(customer.Date);
        if (!groupedByMonth[key]) {
          groupedByMonth[key] = [];
        }
        groupedByMonth[key].push(customer);
      });

      const allMonths = Object.keys(groupedByMonth).sort();

      let cumulative = 0;
      const months = [];
      const newCustomers = [];
      const totalCustomer = [];

      allMonths.forEach((key) => {
        const newCount = groupedByMonth[key].length;
        cumulative += newCount;

        const [year, month] = key.split("-");
        const readableLabel = `${monthNames[Number(month) - 1]}-${year}`;

        months.push(readableLabel);
        newCustomers.push(newCount);
        totalCustomer.push(cumulative);
      });

      return {
        getCustomerChart: {
          months,
          totalCustomer,
          newCustomers,
        },
      };
    } catch (error) {
      console.error("Error in getCustomer:", error);
      throw error;
    }
  },

  // ============================
  /*  totalSaleAmount: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const onlineSalesData = await orderModel.aggregate([
        {
          $match: { org_id: org_id },
        },
        {
          $unwind: "$menu",
        },
        {
          $group: {
            _id: "$timestramp",
            totalAmount: { $sum: { $toDouble: "$menu.Total_amount" } },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            timestamp: "$_id",
            totalAmount: 1,
          },
        },
      ]);

      const shopSalesData = await userOrderModel.aggregate([
        {
          $match: { org_id: org_id },
        },
        {
          $group: {
            _id: "$timestamp",
            totalAmount: { $sum: "$TotalAmount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            timestamp: "$_id",
            totalAmount: 1,
          },
        },
      ]);

      return {
        message: "Sales data fetched successfully",
        shopSales: shopSalesData,
        onlineSales: onlineSalesData,
      };
    } catch (error) {
      console.error("Error calculating total sales by timestamp:", error);
      throw error;
    }
  }, */

  /* totalSaleAmount: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType);

      const onlineMatch = { org_id };
      const shopMatch = { org_id };

      if (Object.keys(dateFilter).length > 0) {
        onlineMatch.timestramp = dateFilter; // Use correct timestamp field
        shopMatch.timestamp = dateFilter;
      }

      const onlineSalesData = await orderModel.aggregate([
        { $match: onlineMatch },
        { $unwind: "$menu" },
        {
          $group: {
            _id: "$timestramp",
            totalAmount: { $sum: { $toDouble: "$menu.Total_amount" } },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            timestamp: "$_id",
            totalAmount: 1,
          },
        },
      ]);

      const shopSalesData = await userOrderModel.aggregate([
        { $match: shopMatch },
        {
          $group: {
            _id: "$timestamp",
            totalAmount: { $sum: "$TotalAmount" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            timestamp: "$_id",
            totalAmount: 1,
          },
        },
      ]);

      return {
        message: "Sales data fetched successfully",
        shopSales: shopSalesData,
        onlineSales: onlineSalesData,
      };
    } catch (error) {
      console.error("Error calculating total sales:", error);
      throw error;
    }
  }, */

  /* totalSaleAmount: async (data) => {
  const { org_id, filterType } = data;

  try {
    const org = await organizationModel.findById(org_id);
    if (!org) throw new Error("org not found");

    const dateFilter = adminService.getDateFilter(filterType);

    const onlineMatch = { org_id };
    const shopMatch = { org_id };

    let selectedYear = new Date(dateFilter.$gte).getFullYear();

    // 👉 Expand filter for full year if month/week is selected
    if (filterType === "month" ) {
      const startOfYear = new Date(selectedYear, 0, 1);       // Jan 1
      const endOfYear = new Date(selectedYear + 1, 0, 1);     // Jan 1 next year

      onlineMatch.timestamp = { $gte: startOfYear, $lt: endOfYear };
      shopMatch.timestamp = { $gte: startOfYear, $lt: endOfYear };
    } else {
      if (Object.keys(dateFilter).length > 0) {
        onlineMatch.timestamp = dateFilter;
        shopMatch.timestamp = dateFilter;
      }
    }

    const groupStage = {
      _id: {},
      totalAmount: {}
    };

    // 📊 Define group key
    switch (filterType) {
      case "day":
        groupStage._id = {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" }
        };
        break;
      case "week":
        groupStage._id = {
          month: { $month: "$timestamp" }
        };
        break;
      case "month":
        groupStage._id = {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" }
        };
        break;
      case "year":
        groupStage._id = {
          year: { $year: "$timestamp" }
        };
        break;
      default:
        throw new Error("Invalid filterType");
    }

    groupStage.totalAmount = {
      $sum: filterType === "day"
        ? { $toDouble: "$menu.Total_amount" }
        : "$TotalAmount"
    };

    // 🛒 Online Sales
    const onlineSalesData = await orderModel.aggregate([
      { $match: onlineMatch },
      { $unwind: "$menu" },
      { $group: groupStage },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // 🏪 Shop Sales
    groupStage.totalAmount = { $sum: "$TotalAmount" }; // reset
    const shopSalesData = await userOrderModel.aggregate([
      { $match: shopMatch },
      { $group: groupStage },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // 🛠 Build Result Map
    const resultMap = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getLabel = (id) => {
      switch (filterType) {
        case "day":
          return `${id.day}-${monthNames[id.month - 1]}`;
        case "week":
        case "month":
          return `${monthNames[id.month - 1]}-${id.year}`;
        case "year":
          return `${id.year}`;
      }
    };

    shopSalesData.forEach(({ _id, totalAmount }) => {
      const label = getLabel(_id);
      resultMap[label] = resultMap[label] || { label, shop: 0, online: 0 };
      resultMap[label].shop = totalAmount;
    });

    onlineSalesData.forEach(({ _id, totalAmount }) => {
      const label = getLabel(_id);
      resultMap[label] = resultMap[label] || { label, shop: 0, online: 0 };
      resultMap[label].online = totalAmount;
    });

    // 🔁 Fill Missing Periods
    const filledData = [];

    if (filterType === "year") {
      for (let y = selectedYear - 4; y <= selectedYear; y++) {
        const label = `${y}`;
        filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
      }
    }

    if (filterType === "month" || filterType === "week") {
      for (let i = 0; i < 12; i++) {
        const label = `${monthNames[i]}-${selectedYear}`;
        filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
      }
    }

    if (filterType === "day") {
      const start = new Date(dateFilter.$gte);
      const end = new Date(dateFilter.$lt);

      while (start < end) {
        const label = `${start.getDate()}-${monthNames[start.getMonth()]}`;
        filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
        start.setDate(start.getDate() + 1);
      }
    }

    return {
      message: "Sales data fetched successfully",
      data: filledData
    };
  } catch (error) {
    console.error("Error calculating total sales:", error);
    throw error;
  }
},  */

  totalSaleAmount: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType);

      const onlineMatch = { org_id };
      const shopMatch = { org_id };

      let selectedYear = new Date(dateFilter.$gte).getFullYear();

      if (filterType === "month" || filterType === "week") {
        const startOfYear = new Date(selectedYear, 0, 1);
        const endOfYear = new Date(selectedYear + 1, 0, 1);
        onlineMatch.timestamp = { $gte: startOfYear, $lt: endOfYear };
        shopMatch.timestamp = { $gte: startOfYear, $lt: endOfYear };
      } else {
        if (Object.keys(dateFilter).length > 0) {
          onlineMatch.timestamp = dateFilter;
          shopMatch.timestamp = dateFilter;
        }
      }

      const groupStage = {
        _id: {},
        totalAmount: {},
      };

      switch (filterType) {
        case "day":
          groupStage._id = {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
          };
          break;
        case "week":
          groupStage._id = {
            isoWeekYear: { $isoWeekYear: "$timestamp" },
            isoWeek: { $isoWeek: "$timestamp" },
          };
          break;
        case "month":
          groupStage._id = {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
          };
          break;
        case "year":
          groupStage._id = {
            year: { $year: "$timestamp" },
          };
          break;
        default:
          throw new Error("Invalid filterType");
      }

      groupStage.totalAmount = {
        $sum:
          filterType === "day"
            ? { $toDouble: "$menu.Total_amount" }
            : "$TotalAmount",
      };

      // 🛒 Online Sales
      const onlineSalesData = await orderModel.aggregate([
        { $match: onlineMatch },
        ...(filterType === "day" ? [{ $unwind: "$menu" }] : []),
        { $group: groupStage },
        { $sort: { _id: 1 } },
      ]);

      // 🏪 Shop Sales
      groupStage.totalAmount = { $sum: "$TotalAmount" };
      const shopSalesData = await userOrderModel.aggregate([
        { $match: shopMatch },
        { $group: groupStage },
        { $sort: { _id: 1 } },
      ]);

      const resultMap = {};
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const getLabel = (id) => {
        switch (filterType) {
          case "day":
            return `${id.day}-${monthNames[id.month - 1]}`;
          case "week": {
            const jan4 = new Date(id.isoWeekYear, 0, 4); // always in week 1
            const monday = new Date(jan4);
            const day = jan4.getDay();
            const diff = day === 0 ? -6 : 1 - day; // shift to Monday
            monday.setDate(jan4.getDate() + diff + (id.isoWeek - 1) * 7);

            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);

            const format = (d) =>
              `${String(d.getDate()).padStart(2, "0")} ${
                monthNames[d.getMonth()]
              }`;
            return `${format(monday)} - ${format(sunday)}`;
          }
          case "month":
            return `${monthNames[id.month - 1]}-${id.year}`;
          case "year":
            return `${id.year}`;
        }
      };

      // 🛠 Build map
      shopSalesData.forEach(({ _id, totalAmount }) => {
        const label = getLabel(_id);
        resultMap[label] = resultMap[label] || { label, shop: 0, online: 0 };
        resultMap[label].shop = totalAmount;
      });

      onlineSalesData.forEach(({ _id, totalAmount }) => {
        const label = getLabel(_id);
        resultMap[label] = resultMap[label] || { label, shop: 0, online: 0 };
        resultMap[label].online = totalAmount;
      });

      // 🔁 Fill Missing Periods
      const filledData = [];

      if (filterType === "year") {
        for (let y = selectedYear - 4; y <= selectedYear; y++) {
          const label = `${y}`;
          filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
        }
      }

      if (filterType === "month") {
        for (let i = 0; i < 12; i++) {
          const label = `${monthNames[i]}-${selectedYear}`;
          filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
        }
      }

      if (filterType === "week") {
        const start = new Date(
          selectedYear,
          new Date(dateFilter.$gte).getMonth(),
          1
        ); // Start of selected month
        const end = new Date(selectedYear, start.getMonth() + 1, 0); // End of selected month (e.g., 31 Jul)

        // Adjust start to previous Monday (if not already Monday)
        const day = start.getDay();
        const monday = new Date(start);
        monday.setDate(monday.getDate() - ((day + 6) % 7)); // Move to Monday

        while (monday <= end) {
          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);

          // Only include weeks that fall at least partially in the selected month
          if (
            monday.getMonth() === start.getMonth() ||
            sunday.getMonth() === start.getMonth()
          ) {
            const format = (d) =>
              `${String(d.getDate()).padStart(2, "0")} ${
                monthNames[d.getMonth()]
              }`;
            const label = `${format(monday)} - ${format(sunday)}`;

            filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
          }

          // Move to next week
          monday.setDate(monday.getDate() + 7);
        }
      }

      if (filterType === "day") {
        const start = new Date(dateFilter.$gte);
        const end = new Date(dateFilter.$lt);
        while (start < end) {
          const label = `${start.getDate()}-${monthNames[start.getMonth()]}`;
          filledData.push(resultMap[label] || { label, shop: 0, online: 0 });
          start.setDate(start.getDate() + 1);
        }
      }

      return {
        message: "Sales data fetched successfully",
        data: filledData,
      };
    } catch (error) {
      console.error("Error calculating total sales:", error);
      throw error;
    }
  },

  // ==================
  /*  getSalesPurchase: async (data) => {
     const {org_id} = data
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const sale = await userOrderModel.find();
      console.log(sale.TotalAmount, sale.timestamp);
      return { TotalAmount: sale.TotalAmount, timestamp: sale.timestamp };
    } catch (error) {
      throw error;
    }
  }, */
  /*  getSalesPurchase: async (data) => {
    const { org_id } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }

      const salesData = await userOrderModel.aggregate([
        {
          $match: { org_id: org_id }, // ✅ Only this org
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$TotalAmount" },
            latestTimestamp: { $max: "$timestamp" },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            latestTimestamp: 1,
          },
        },
      ]);

      // Fallback if no data
      const result = salesData[0] || { totalAmount: 0, latestTimestamp: null };

      return result;
    } catch (error) {
      throw error;
    }
  }, */

  getSalesPurchase: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }

      const dateFilter = adminService.getDateFilter(filterType);
      const matchQuery = { org_id };
      if (Object.keys(dateFilter).length > 0) {
        matchQuery.timestamp = dateFilter;
      }

      const salesData = await userOrderModel.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$TotalAmount" },
            latestTimestamp: { $max: "$timestamp" },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            latestTimestamp: 1,
          },
        },
      ]);

      return salesData[0]
        ? {
            totalAmount: parseFloat(salesData[0].totalAmount.toFixed(2)),
            latestTimestamp: salesData[0].latestTimestamp,
          }
        : { totalAmount: 0, latestTimestamp: null };
    } catch (error) {
      throw error;
    }
  },

  // ===================

  createDiscout: async (data) => {
    const {
      admin_id,
      org_id,
      discountAmount,
      discount_category,
      dis_main_Category,
      validFrom,
      validTo,
      isActive,
    } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      console.log(data, "dTA");
      const startOfDay = new Date(validFrom);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(validTo);
      endOfDay.setHours(23, 59, 59, 999);

      const existingDiscount = await discountModel.findOne({
        org_id,
        dis_main_Category: dis_main_Category,
        discount_category: {
          $in: Array.isArray(discount_category)
            ? discount_category
            : [discount_category],
        },
        validFrom: { $lte: endOfDay },
        validTo: { $gte: startOfDay },
      });

      console.log(existingDiscount, "existingDiscount");

      if (existingDiscount) {
        throw new Error(
          "A discount with the same category and overlapping date range already exists."
        );
      }

      const discount_code = Math.floor(1000 + Math.random() * 9000);

      // Create the new discount
      const createDiscount = await discountModel.create({
        admin_id,
        org_id,
        dicount_code: discount_code,
        discountAmount,
        discount_category,
        dis_main_Category,
        validFrom,
        validTo,
        isActive,
      });

      return createDiscount;
    } catch (error) {
      throw error;
    }
  },

  /* createDiscout: async (data) => {
    const { admin_id,
      org_id,
      dicount_code,
      discountAmount,
      discount_category,
      dis_main_Category,
      validFrom,
      validTo,
      isActive } = data
    console.log(data)
    try {
      const discount_code = Math.floor(1000 + Math.random() * 9000);
      console.log(discount_code);
      const createDiscout = await discountModel.create({
        admin_id,
        org_id,
        dicount_code: discount_code,
        discountAmount,
        discount_category,
        dis_main_Category,
        validFrom,
        validTo,
        isActive
      });
      return createDiscout
    } catch (error) {
      throw error
    }
  }, */
  // ===================
  getDiscount: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getDiscount = await discountModel.find({ org_id });
      return getDiscount;
    } catch (error) {
      throw error;
    }
  },

  // ==========
  updateDiscount: async (data) => {
    const {
      org_id,
      admin_id,
      discount_id,
      discountAmount,
      discount_category,
      dis_main_Category,
      validFrom,
      validTo,
      isActive,
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
      const updateDiscount = await discountModel.findOneAndUpdate(
        { _id: discount_id, org_id },
        {
          discountAmount,
          discount_category,
          dis_main_Category,
          validFrom,
          validTo,
          isActive,
        },
        { new: true }
      );
      return updateDiscount;
    } catch (error) {
      throw error;
    }
  },

  // =========================
  deleteDiscount: async (data) => {
    const { discount_id, org_id } = data;
    console.log(discount_id, "po");
    try {
      const deleteDiscount = await discountModel.findOneAndDelete({
        _id: discount_id,
        org_id,
      });
      return deleteDiscount;
    } catch (error) {
      throw error;
    }
  },
  // ===================
  /*  getSale: async (org_id, filterType) => {
    try {
      const today = new Date();
      let startDate;

      if (filterType === "daily") {
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
      } else if (filterType === "weekly") {
        const startOfWeek = today.getDate() - today.getDay();
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          startOfWeek
        );
      } else if (filterType === "monthly") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      }

      console.log("Start Date:", startDate);

      if (!startDate) {
        throw new Error(
          "Start date is undefined. Please check the filter type."
        );
      }

      const saleQuery = {
        org_id: org_id,
        TableStatus: "Completed",
        timestamp: { $gte: startDate },
      };

      // console.log("Sale Query:", saleQuery);

      const sale = await userOrderModel.find(saleQuery, { TotalAmount: 1 });
      // console.log(sale,"sale")
      const totalSaleAmount = sale.reduce(
        (sum, record) => sum + record.TotalAmount,
        0
      );

      const purchaseQuery = {
        org_id: org_id,
        timestamp: { $gte: startDate },
      };

      const products = await ProductModel.find(purchaseQuery);
      console.log(products, "products");

      const totalPurchaseAmount = products.reduce(
        (sum, record) => sum + record.Price,
        0
      );
      console.log("Total Purchase Amount:", totalPurchaseAmount);

      let profit = 0;
      let loss = 0;
      if (totalSaleAmount > totalPurchaseAmount) {
        profit = totalSaleAmount - totalPurchaseAmount;
      } else if (totalPurchaseAmount > totalSaleAmount) {
        loss = totalPurchaseAmount - totalSaleAmount;
      }

      return {
        totalSaleAmount,
        totalPurchaseAmount,
        profit,
        loss,
      };
    } catch (error) {
      
      console.error("Error in getSale:", error);
      throw error;
    }
  }, */

  getSale: async (data) => {
    const { org_id, filterType } = data;

    try {
      const dateFilter = adminService.getDateFilter(filterType); // returns something like { $gte: ..., $lt: ... }

      const saleQuery = {
        org_id,
        TableStatus: "Blank",
      };

      if (Object.keys(dateFilter).length > 0) {
        saleQuery.timestamp = dateFilter;
      }

      const sale = await userOrderModel.find(saleQuery, { TotalAmount: 1 });

      const totalSaleAmount = sale.reduce(
        (sum, record) => sum + (record.TotalAmount || 0),
        0
      );

      /* const purchaseQuery = {
        org_id,
      };

      if (Object.keys(dateFilter).length > 0) {
        purchaseQuery.timestamp = dateFilter;
      }

      const products = await ProductModel.find(purchaseQuery);

      const totalPurchaseAmount = products.reduce(
        (sum, record) => sum + (record.price  || 0),
        0
      ); */

      const purchaseQuery = { org_id };

      if (Object.keys(dateFilter).length > 0) {
        purchaseQuery.timestamp = dateFilter;
      }

      const purchases = await PurchaseModel.find(purchaseQuery);

      const totalPurchaseAmount = purchases.reduce(
        (sum, record) => sum + (record.purchase_price || 0),
        0
      );

      let profit = 0;
      let loss = 0;

      if (totalSaleAmount > totalPurchaseAmount) {
        profit = totalSaleAmount - totalPurchaseAmount;
      } else if (totalPurchaseAmount > totalSaleAmount) {
        loss = totalPurchaseAmount - totalSaleAmount;
      }

      return {
        totalSaleAmount,
        totalPurchaseAmount,
        profit,
        loss,
      };
    } catch (error) {
      console.error("Error in getSale:", error);
      throw error;
    }
  },

  // ==============
  /*    getSalesDiscout: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const getSalesDiscount = await userOrderModel.find(
        {
          org_id: org_id,
          TableStatus: "Blank",
        },
        { "Dishes.menu_Category_id": 1, DiscountAmount: 1, timestamp: 1 }
      );

      const menuCategoryIds = getSalesDiscount.flatMap((order) =>
        order.Dishes.map((dish) => dish.menu_Category_id)
      );

      const categories = await menuCategoryModel.find({
        _id: { $in: menuCategoryIds },
      });

      const categoryMap = categories.reduce((map, category) => {
        map[category._id] = category.Category;
        return map;
      }, {});
      // console.log(categoryMap)
      // console.log(getSalesDiscount,"getSalesDiscount")
      const updatedSalesDiscount = getSalesDiscount.map((order) => ({
        Dishes: order.Dishes.map((dish) => ({
          menu_Category_id: dish.menu_Category_id,
          category: categoryMap[dish.menu_Category_id] || "Unknown",
          discountAmount: order.DiscountAmount,
        })),
      }));

      return updatedSalesDiscount;
    } catch (error) {
      console.error("Error in getSalesDiscount:", error);
      throw error;
    }
  }, */

  /*  getSalesDiscout: async (data) => {
    const { org_id, filterType } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const dateFilter = adminService.getDateFilter(filterType);

      const matchQuery = {
        org_id: org_id,
        TableStatus: "Blank",
      };

      if (Object.keys(dateFilter).length > 0) {
        matchQuery.timestamp = dateFilter;
      }
      // if (dateFilter?.$gte || dateFilter?.$lt) {
      //   matchQuery.Date = dateFilter;
      // }

      const getSalesDiscount = await userOrderModel.find(matchQuery, {
        "Dishes.menu_Category_id": 1,
        DiscountAmount: 1,
        timestamp: 1,
      });

      const menuCategoryIds = getSalesDiscount.flatMap((order) =>
        order.Dishes.map((dish) => dish.menu_Category_id)
      );

      const categories = await menuCategoryModel.find({
        _id: { $in: menuCategoryIds },
      });

      const categoryMap = categories.reduce((map, category) => {
        map[category._id] = category.Category;
        return map;
      }, {});

      const updatedSalesDiscount = getSalesDiscount.map((order) => ({
        Dishes: order.Dishes.map((dish) => ({
          menu_Category_id: dish.menu_Category_id,
          category: categoryMap[dish.menu_Category_id] || "Unknown",
          discountAmount: order.DiscountAmount,
        })),
      }));

      return updatedSalesDiscount;
    } catch (error) {
      console.error("Error in getSalesDiscount:", error);
      throw error;
    }
  }, */

  getSalesDiscout: async (data) => {
    const { org_id, item } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      if (!item || typeof item !== "string") {
        throw new Error("Item is required and must be a string");
      }

      const matchQuery = {
        org_id,
        TableStatus: "Blank",
      };

      // Fetch all data — not filtered by date
      const getSalesDiscount = await userOrderModel.find(matchQuery, {
        "Dishes.menu_Category_id": 1,
        "Dishes.discountAmount": 1,
        DiscountAmount: 1,
        timestamp: 1,
      });
      console.log(getSalesDiscount, "dis");

      const menuCategoryIds = getSalesDiscount.flatMap((order) =>
        order.Dishes.map((dish) => dish.menu_Category_id)
      );

      const categories = await menuCategoryModel.find({
        _id: { $in: menuCategoryIds },
      });

      const categoryMap = categories.reduce((map, category) => {
        map[category._id] = category.Category;
        return map;
      }, {});

      const monthWiseDiscount = {};

      getSalesDiscount.forEach((order) => {
        const month = new Date(order.timestamp).toLocaleString("default", {
          month: "short",
        });

        order.Dishes.forEach((dish) => {
          const category = categoryMap[dish.menu_Category_id] || "Unknown";

          if (category.toLowerCase() !== item.toLowerCase()) return;

          if (!monthWiseDiscount[month]) {
            monthWiseDiscount[month] = 0;
          }

          monthWiseDiscount[month] +=
            dish.discountAmount || order.DiscountAmount || 0;
        });
      });

      const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const months = [];
      const sales = [];

      allMonths.forEach((month) => {
        months.push(month);
        sales.push(monthWiseDiscount[month] || 0);
      });

      return {
        getSalesChart: {
          item,
          months,
          sales,
        },
      };
    } catch (error) {
      console.error("Error in getSalesDiscount:", error);
      throw error;
    }
  },

  getIncomeExpense: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("Organization not found");

      // Initialize monthly data
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        income: 0,
        expense: 0,
      }));

      // Fetch purchases
      const purchases = await PurchaseModel.find({ org_id });
      purchases.forEach((purchase) => {
        const month = new Date(purchase.purchase_date).getMonth(); // 0-based
        months[month].expense += purchase.purchase_price;
      });

      // Fetch accounts (billed income)
      const bills = await accountModel.find({ org_id, status: "Completed" });
      bills.forEach((bill) => {
        const month = new Date(bill.date).getMonth(); // 0-based
        months[month].income += Number(bill.amount || 0);
      });

      /* 
       //userOrder TotalAmount
       
       const orders = await userOrderModel.find({
        org_id , TableStatus: "Blank",
      });
      orders.forEach((o) => {
        const date = new Date(o.timestamp);
        if (!isNaN(date)) {
          months[date.getMonth()].income += Number(o.TotalAmount || 0);
        }
      }); */

      // Prepare formatted response
      const result = months.map((entry, index) => ({
        month: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][index],
        income: entry.income,
        expense: entry.expense,
      }));

      return {
        message: "Income and Expense data fetched",
        data: result,
      };
    } catch (error) {
      console.error("Error in getIncomeExpense:", error.message);
      throw error;
    }
  },

  // ===============
  /*  dashboard: async (data) => {
    const { org_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("org not found");
      }
      const lowStock = await adminService.getLowStock({ org_id });
      const outOfStock = await adminService.outOfStock({ org_id });
      const getdeliverPartner = await adminService.getdeliverPartner({
        org_id,
      });
      const getEmployeeCount = await adminService.getEmployeeCount({ org_id });
      const getPopularDish = await adminService.getPopularDish({ org_id });
      const getCustomerCount = await adminService.getCustomerCount({ org_id });
      const getCustomer = await adminService.getCustomer({ org_id });
      const totalSaleAmount = await adminService.totalSaleAmount({ org_id });
      const getSalesDiscout = await adminService.getSalesDiscout({ org_id });
      // const getSale = await adminService.getSale();
      const getProfit = await adminService.getProfit({ org_id });

      return {
        lowStock,
        outOfStock,
        getdeliverPartner,
        getEmployeeCount,
        getPopularDish,
        getCustomerCount,
        getCustomer,
        totalSaleAmount,
        getSalesDiscout,
        getProfit,
      };
    } catch (error) {
      throw error;
    }
  }, */

  /* dashboard: async (data) => {
    const { org_id, filterType } = data;
    const dateFilter = adminService.getDateFilter(filterType);
console.log("Called getCustomerCount with:", { org_id, filterType });

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const filterParams = { org_id, dateFilter };

      const lowStock = await adminService.getLowStock({ org_id }); // Static
      const outOfStock = await adminService.outOfStock({ org_id }); // Static
      const getdeliverPartner = await adminService.getdeliverPartner({
        org_id,
      }); // Static
      const getEmployeeCount = await adminService.getEmployeeCount({ org_id }); // Static

      const getPopularDish = await adminService.getPopularDish(filterParams); //c
      const getCustomerCount = await adminService.getCustomerCount(
        filterParams
      ); //c
      const getCustomer = await adminService.getCustomer(filterParams); //c
      const totalSaleAmount = await adminService.totalSaleAmount(filterParams); //c
      const getSalesDiscout = await adminService.getSalesDiscout(filterParams); //c
      const getProfit = await adminService.getProfit(filterParams); //c
      // const getSale = await adminService.getSale(filterParams); //c

      return {
        lowStock,
        outOfStock,
        getdeliverPartner,
        getEmployeeCount,
        getPopularDish,
        getCustomerCount,
        getCustomer,
        totalSaleAmount,
        getSalesDiscout,
        getProfit,
        // getSale,
      };
    } catch (error) {
      throw error;
    }
  }, */

  dashboard: async (data) => {
    const { org_id, filterType } = data;
    console.log("Called getCustomerCount with:", { org_id, filterType });

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) throw new Error("org not found");

      const filterParams = { org_id, filterType };

      const lowStock = await adminService.getLowStock({ org_id }); // Static
      const outOfStock = await adminService.outOfStock({ org_id }); // Static
      const getdeliverPartner = await adminService.getdeliverPartner({
        org_id,
      }); // Static
      const getEmployeeCount = await adminService.getEmployeeCount({ org_id }); // Static

      const getPopularDish = await adminService.getPopularDish(filterParams); //c
      const getCustomerCount = await adminService.getCustomerCount(
        filterParams
      ); //c
      const getTotal = await adminService.getSalesPurchase(filterParams);
      const totalSaleAmount = await adminService.totalSaleAmount(filterParams); //c
      // const getProfit = await adminService.getProfit(filterParams); //c
      const getSale = await adminService.getSale(filterParams);

      const getPaymentMethod = await adminService.getPaymentMethods(
        filterParams
      );

      return {
        lowStock,
        outOfStock,
        getdeliverPartner,
        getEmployeeCount,
        getPopularDish,
        getCustomerCount,
        getTotal,
        totalSaleAmount,
        // getProfit,
        getSale,

        getPaymentMethod,
      };
    } catch (error) {
      throw error;
    }
  },

  // ========================
  /* getProfit: async (data) => {
    const { org_id } = data;
    try {
      // Step 1: Calculate Total Sales from completed orders
      const saleResult = await userOrderModel.aggregate([
        {
          $match: {
            org_id: org_id,
            TableStatus: "Completed",
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$TotalAmount" },
          },
        },
      ]);
      const totalSales = saleResult.length > 0 ? saleResult[0].totalSales : 0;

      // const inventory = await inventoryModel.find({ org_id: org_id });
      // let totalPurchases = 0;

      // for (const item of inventory) {
      //   const product = await ProductModel.findById(item.Product_id);
      //   console.log(product.Price, "product");
      //   if (product && product.Price) {
      //     totalPurchases += product.Price * product.stock_quantity;
      //   }
      // }

      const inventory = await inventoryModel.find({ org_id: org_id });
      let totalPurchases = 0;

      for (const item of inventory) {
        const product = await ProductModel.findById(item.Product_id);
        if (product && product.Price && item.stock_quantity) {
          totalPurchases += product.Price * item.stock_quantity;
        }
      }

      console.log(totalPurchases, "totalPurchases");

      let profit = 0;
      let loss = 0;
      if (totalSales > totalPurchases) {
        profit = totalSales - totalPurchases;
      } else if (totalPurchases > totalSales) {
        loss = totalPurchases - totalSales;
      }

      return {
        totalSales,
        totalPurchases,
        profit,
        loss,
      };
    } catch (error) {
      throw error;
    }
  }, */

  getProfit: async (data) => {
    const { org_id, filterType } = data;

    try {
      const dateFilter = adminService.getDateFilter(filterType);

      const salesMatch = {
        org_id: org_id,
        TableStatus: "Blank",
      };

      // if (Object.keys(dateFilter).length > 0) {
      //   salesMatch.timestamp = dateFilter;
      // }
      if (dateFilter?.$gte || dateFilter?.$lt) {
        salesMatch.Date = dateFilter;
      }

      const saleResult = await userOrderModel.aggregate([
        { $match: salesMatch },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$TotalAmount" },
          },
        },
      ]);

      const totalSales = saleResult.length > 0 ? saleResult[0].totalSales : 0;

      const inventory = await inventoryModel.find({ org_id: org_id });
      let totalPurchases = 0;

      for (const item of inventory) {
        const product = await ProductModel.findById(item.Product_id);
        if (product && product.Price && item.stock_quantity) {
          totalPurchases += product.Price * item.stock_quantity;
        }
      }

      let profit = 0;
      let loss = 0;
      if (totalSales > totalPurchases) {
        profit = totalSales - totalPurchases;
      } else if (totalPurchases > totalSales) {
        loss = totalPurchases - totalSales;
      }

      return {
        totalSales,
        totalPurchases,
        profit,
        loss,
      };
    } catch (error) {
      console.error("Error in getProfit:", error);
      throw error;
    }
  },

  getPaymentMethods: async (data) => {
    const { org_id, filterType } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const dateFilter = adminService.getDateFilter(filterType); // Get date filter range

      const matchQuery = { org_id, status: "Completed" };
      // if (Object.keys(dateFilter).length > 0) {
      //   matchQuery.timestamp = dateFilter; // Apply filter on timestamp
      // }
      if (dateFilter?.$gte || dateFilter?.$lt) {
        matchQuery.timestamp = dateFilter; // Use "timestamp", not "Date", assuming "timestamp" is your date field in accountModel
      }

      const result = await accountModel.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: "$paymentMode",
            count: { $sum: 1 },
          },
        },
      ]);

      const total = result.reduce((sum, mode) => sum + mode.count, 0);

      const formatted = result.map((entry) => ({
        paymentMode: entry._id,
        count: entry.count,
        percentage: ((entry.count / total) * 100).toFixed(2) + "%",
      }));

      return formatted;
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  },

  getDateFilter: (filterType) => {
    const now = new Date();
    let startDate, endDate;

    switch (filterType) {
      case "day":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        break;

      case "week":
        const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
        startDate = new Date(now);
        startDate.setDate(now.getDate() - dayOfWeek);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        break;

      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;

      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;

      default:
        return {};
    }

    return { $gte: startDate, $lt: endDate };
  },
};
export default adminService;
