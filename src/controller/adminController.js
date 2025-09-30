import adminService from "../../src/service/adminService.js";

const adminController = {
  createApp: async (req, res, next) => {
    try {
      const createdApp = await adminService.createApp(req.body);
      console.log(createdApp);
      res.status(200).json({
        message: "App created successfully",
        data: createdApp,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ========================================
  getApp: async (req, res, next) => {
    try {
      const getApp = await adminService.getApp();
      res.status(200).json({
        message: "successfully",
        data: getApp,
      });
    } catch (error) {
      console.error("Error in getApp controller:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  // =====================================
  updateApp: async (req, res, next) => {
    const { applogo_id, appLogo, sub_Category } = req.body;
    try {
      const updateApp = await adminService.updateApp(req.body);
      res.status(200).json({
        message: "successfully",
        data: updateApp,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =========================
  deleteApp: async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteApp = await adminService.deleteApp(id);
      res.status(200).json({
        msg: "deleted succesfully",
        data: deleteApp,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ---------------------
  status: async (req, res) => {
    try {
      const result = await adminService.status(req.body);
      res.status(200).json({
        message: "status created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating status",
      });
    }
  },

  // ========================================
  getAllstatus: async (req, res, next) => {
    try {
      const getAllstatus = await adminService.getAllstatus(req.body);
      res.status(200).json({
        msg: "successfully",
        data: getAllstatus,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =====================================
  updatestatus: async (req, res, next) => {
    try {
      const updatestatus = await adminService.updatestatus(req.body);
      res.status(200).json({
        msg: "updated",
        data: updatestatus,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =========================
  deletestatus: async (req, res, next) => {
    const { status_id } = req.body;
    try {
      const deletestatus = await adminService.deletestatus(status_id);
      res.status(200).json({
        msg: "deleted",
        data: deletestatus,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ---------------------
  createCategory: async (req, res, next) => {
    try {
      const createCategory = await adminService.createCategory(req.body);
      res.status(200).json({
        data: createCategory,
      });
    } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ========================================
  getAllCategory: async (req, res, next) => {
    try {
      const getAllCategory = await adminService.getAllCategory();
      res.status(200).json({
        data: getAllCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =====================================
  updateCategory: async (req, res, next) => {
    try {
      const updateCategory = await adminService.updateCategory(req.body);
      res.status(200).json({
        msg: "updated",
        data: updateCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =========================
  deleteCategory: async (req, res, next) => {
    const { id: category_id } = req.params;

    try {
      const deletedCategory = await adminService.deleteCategory(category_id);
      res.status(200).json({
        data: deletedCategory,
      });
    } catch (error) {
      console.error("Error in deleteCategory controller:", error);
      error.statuscode = error.statuscode || 500;
      next(error);
    }
  },
  //==================================================
  deleteTable: async (req, res, next) => {
    const { id: tablerooms_id, org_id } = req.params;
    try {
      const deleteDeails = await adminService.deleteTable({
        tablerooms_id,
        org_id,
      });
      res.status(200).json({
        message: "deleted successfully",
        data: deleteDeails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==================================
  register: async (req, res, next) => {
    // console.log(req.body,"k")
    try {
      const register = await adminService.register(req.body);
      res.status(200).json({
        message: "registered successfully",
        data: register,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ================
  updatePassword: async (req, res, next) => {
    try {
      const updatePassword = await adminService.updatePassword(req.body);
      res.status(200).json({
        message: "successfully",
        data: updatePassword,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  userCommonregister: async (req, res, next) => {
    // console.log(req.body, "")
    try {
      const register = await adminService.userCommonregister(req.body);
      res.status(200).json(register);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ==========================
  userCommonlogin: async (req, res, next) => {
    // console.log(req.body, "")
    try {
      const userlogin = await adminService.userCommonlogin(req.body);
      res.status(200).json(userlogin);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // --:-----------
  userregister: async (req, res, next) => {
    // console.log(req.body, "")
    try {
      const register = await adminService.userregister(req.body);
      res.status(200).json(register);
    } catch (error) {
      error.message = error.error;
      console.log(error);
      error.statuscode = 500;
      next(error);
    }
  },
  // -------------
  userlogin: async (req, res, next) => {
    // console.log(req.body, "")
    try {
      const login = await adminService.userlogin(req.body);
      console.log(login);

      res.status(200).json(login);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //============================
  getRemainingUserCount: async (req, res, next) => {
    try {
      const userCount = await adminService.getRemainingUserCount(req.params);
      console.log(userCount);

      res.status(200).json(userCount);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //**************************** */

  getUser: async (req, res, next) => {
    try {
      const allUser = await adminService.getUser(req.params);
      console.log(allUser);

      res.status(200).json(allUser);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //**************************** */
  // ----------------------------------
  userUpdatePassword: async (req, res, next) => {
    // console.log(req.body, "");
    try {
      const UserupdatePassword = await adminService.userUpdatePassword(
        req.body
      );
      res.status(200).json(UserupdatePassword);
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ====================
  login: async (req, res, next) => {
    console.log(req.body, "sk");
    try {
      const login = await adminService.login(req.body);
      res.status(200).json({
        message: "successfully",
        data: login,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.error || "An error occurred",
      });
    }
  },

  // ------------------------
  getOrganisation: async (req, res, next) => {
    const { admin_id } = req.body;
    try {
      const getOrganisation = await adminService.getOrganisation(admin_id);
      res.status(200).json({
        message: "successfully",
        data: getOrganisation,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ================
  getOverAllorganisation: async (req, res, next) => {
    try {
      const getOverAllorganisation =
        await adminService.getOverAllorganisation();
      res.status(200).json({
        data: getOverAllorganisation,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  deleteOrganization: async (req, res, next) => {
    try {
      const deleteOrgDetails = await adminService.deleteOrganization(req.body);
      res.status(200).json(deleteOrgDetails);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //================= profile ==================

  getProfile: async (req, res, next) => {
    try {
      const profile = await adminService.getProfile(req.params);
      res.status(200).json({
        message: "admin data",
        data: profile,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const profile = await adminService.updateProfile(req.body);
      res.status(200).json({
        message: "profile data",
        data: profile,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =================
  menuCategory: async (req, res, next) => {
    try {
      const menuCategory = await adminService.menuCategory(req.body);
      res.status(200).json({
        message: " Stored",
        data: menuCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //new

  getMenuCategory: async (req, res, next) => {
    try {
      const menuCat = await adminService.getMenuCategory(req.params);
      res.status(200).json({
        message: "all category",
        data: menuCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getAllCategoryList: async (req, res, next) => {
    try {
      const menuCategory = await adminService.getAllCategoryList(req.params);
      res.status(200).json({
        message: "all category",
        data: menuCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  updateMenuCategory: async (req, res, next) => {
    try {
      const menuCategory = await adminService.updateMenuCategory(req.body);
      res.status(200).json({
        message: " Stored",
        data: menuCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  deleteMenuCategory: async (req, res, next) => {
    try {
      const menuCategory = await adminService.deleteMenuCategory(req.params);
      res.status(200).json({
        message: " deleted",
        data: menuCategory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ======================

  createMenuItem: async (req, res, next) => {
    try {
      const menuitemList = await adminService.createMenuItem(req.body);
      res.status(200).json({
        message: "Product Stored",
        data: menuitemList,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //=====================================
  getmenuItems: async (req, res, next) => {
    const { org_id, Category } = req.params;
    try {
      const getIdMenuitem = await adminService.getmenuItems(org_id, Category);
      res.status(200).json({
        data: getIdMenuitem,
      });
    } catch (error) {
      (error.message = error.message), (error.statuscode = 400);
      console.error(error);
      next(error);
    }
  },
  //=============================
  getoverallMenuitem: async (req, res, next) => {
    try {
      const getOverallMenuitem = await adminService.getoverallMenuitem(
        req.params
      );
      res.status(200).json({
        data: getOverallMenuitem,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================
  menuitemUpdate: async (req, res, next) => {
    try {
      const updateidMenuitem = await adminService.menuitemUpdate(req.body);
      console.log(updateidMenuitem);
      res.status(200).json({
        data: updateidMenuitem,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //============================
  updateMenuname: async (req, res, next) => {
    try {
      const updateMenuitemName = await adminService.updateMenuname(req.body);
      res.status(200).json({
        data: updateMenuitemName,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================
  deleteMenuitem: async (req, res, next) => {
    const { menu_item_id } = req.body;
    try {
      const removeMenuitem = await adminService.deleteMenuitem(req.body);
      res.status(200).json({
        data: removeMenuitem,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ----------------------------
  registerApp: async (req, res, next) => {
    try {
      const userDetails = await adminService.register(req.body);
      res.status(200).json({
        message: "Details Stored",
        data: userDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===================================
  updateUserdetails: async (req, res, next) => {
    try {
      const updateIdUserDetails = await adminService.updateUserdetails(
        req.body
      );
      res.status(200).json({
        data: updateIdUserDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===================================
  deleteuserdetails: async (req, res, next) => {
    try {
      const deleteDetails = await adminService.deleteuserdetails(req.params);
      res.status(200).json({
        msg: "deleted",
        data: deleteDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =========================================
  createRoomcategory: async (req, res, next) => {
    try {
      const categoryofRoomsTable = await adminService.createRoomcategory(
        req.body
      );
      res.status(200).json({
        message: "Details Stored",
        data: categoryofRoomsTable,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==================================
  getRoomsAndTables: async (req, res, next) => {
    try {
      const result = await adminService.getRoomsAndTables(req.params);
      res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error in getRoomsAndTables controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //==================================
  getOverAllroomsAndtables: async (req, res, next) => {
    try {
      const getoverallSubroomsandTables =
        await adminService.getOverAllroomsAndtables();
      res.status(200).json({
        data: getoverallSubroomsandTables,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==================================
  updatesubroomsandtable: async (req, res, next) => {
    try {
      const updateId = await adminService.updatesubroomsandtable(req.body);
      res.status(200).json({
        data: updateId,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ==========================

  iconandNameCreated: async (req, res, next) => {
    try {
      const iconandNameCreated = await adminService.iconandNameCreated(
        req.body
      );
      res.status(200).json({
        msg: "icon created successfully",
        data: iconandNameCreated,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=========================================
  geticon: async (req, res, next) => {
    const icon_id = req.params.id;
    try {
      const getOnlyIddetails = await adminService.geticon(icon_id);
      res.status(200).json({
        data: getOnlyIddetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=========================================
  getOverallDetails: async (req, res, next) => {
    try {
      const getOverAlldetails = await adminService.getOverallDetails();
      res.status(200).json({
        data: getOverAlldetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //========================================
  updateIcon: async (req, res, next) => {
    try {
      const idupdateDetails = await adminService.updateIcon(req.body);
      res.status(200).json(idupdateDetails);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //======================================
  deleteIcon: async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteDetails = await adminService.deleteIcon(id);
      res.status(200).json(deleteDetails);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =================================
  sendEmail: async (req, res, next) => {
    const { email, link } = req.body;

    try {
      const sendEmail = await adminService.sendEmailService(email, link);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   =====================================
  getallCategoryStock: async (req, res, next) => {
    try {
      const { ProductImage, ProductName, ProductCatagory, Price } = req.query;

      const getAllCategoryStock = await adminService.getallCategoryStock(
        ProductImage,
        ProductName,
        ProductCatagory,
        Price
      );
      res.status(200).json({
        message: "Get All category Details",
        data: getAllCategoryStock,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //===================================
  getOverallOrder: async (req, res, next) => {
    try {
      const getOverAllOrders = await adminService.getOverallOrder();
      res.status(200).json({
        message: "Get Overall Orders",
        data: getOverAllOrders,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==================================
  gatallOrderItems: async (req, res, next) => {
    try {
      const getallOrderlist = await adminService.gatallOrderItems();
      res.status(200).json({
        message: "Get OverallItems details",
        data: getallOrderlist,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================================
  getallCustomers: async (req, res, next) => {
    try {
      const getallDetails = await adminService.getallCustomers();
      res.status(200).json({
        message: "Get OverallCustomers details",
        data: getallDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getallPayments: async (req, res, next) => {
    try {
      const getallPayments = await adminService.getallPayments();
      res.status(200).json({
        message: "Get Overall Payments details",
        data: getallPayments,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==============================================
  getallReceipts: async (req, res, next) => {
    try {
      const getallReceipts = await adminService.getallReceipts();
      res.status(200).json({
        message: "Get Overall Receipts Details",
        data: getallReceipts,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==============================================
  getallSalesReport: async (req, res, next) => {
    try {
      const getallSalesReport = await adminService.getallSalesReport();
      res.status(200).json({
        message: "Get Overall SalesReport Details",
        data: getallSalesReport,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getAllLoyaltyPrograms: async (req, res, next) => {
    try {
      const getOverallLoyaltyPrograms =
        await adminService.getAllLoyaltyPrograms();
      res.status(200).json({
        message: " Overall LoyaltyPrograms Details",
        data: getOverallLoyaltyPrograms,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=================================================
  getallTables: async (req, res, next) => {
    try {
      const getallTable = await adminService.getallTables();
      res.status(200).json({
        message: " Overall Tables Details",
        data: getallTable,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //======================================
  getMenuitem: async (req, res, next) => {
    try {
      const menu_item_id = req.params.id;
      const result = await adminService.getMenuitem(menu_item_id);
      res.status(200).json({ data: result });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //========================================
  deleteMenu: async (req, res, next) => {
    const { id: menu_item_id, org_id } = req.params;
    try {
      const deleteList = await adminService.deleteMenu({
        menu_item_id,
        org_id,
      });
      res.status(200).json(deleteList);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //====================================================
  MenuitemCategory: async (req, res, next) => {
    try {
      const getProduct = await adminService.MenuitemCategory(req.params);
      res.status(200).json(getProduct);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //========================================
  memberRegistation: async (req, res, next) => {
    try {
      const memberRegister = await adminService.memberRegistation(req.body);
      res.status(200).json({
        message: "Member Registation Successfully",
        data: memberRegister,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //======================================================
  updateRegistation: async (req, res, next) => {
    try {
      const updateRegister = await adminService.updateRegistation(req.body);
      res.status(200).json({
        message: "Update Member Registation",
        data: updateRegister,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================
  deleteRegistation: async (req, res, next) => {
    try {
      const deleteRegister = await adminService.deleteRegistation(req.params);
      res.status(200).json({
        message: "Delete Member Registation",
        data: deleteRegister,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //==============================================
  updateProductEntry: async (req, res, next) => {
    try {
      const updateProductentry = await adminService.updateProductEntry(
        req.body
      );
      res.status(200).json(updateProductentry);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=======================================

  //===========================================
  notesMaster: async (req, res, next) => {
    try {
      const notes = await adminService.notesMaster(req.body);
      res.status(200).json({
        data: notes,
        message: "Note Master Created",
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=====================================================
  updateNotesmaster: async (req, res, next) => {
    try {
      const editNotemaster = await adminService.updateNotesmaster(req.body);
      res.status(200).json({
        data: editNotemaster,
        message: "updated Note Master",
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===========================================
  deleteNotemaster: async (req, res, next) => {
    const { id: noteMaster_id, org_id } = req.params;
    try {
      const removeNoteMaster = await adminService.deleteNotemaster({
        noteMaster_id,
        org_id,
      });
      res.status(200).json({
        data: removeNoteMaster,
        message: "Delete Note Master",
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getallmembers: async (req, res, next) => {
    try {
      const getallMemberRegister = await adminService.getallmembers(req.body);
      res.status(200).json(getallMemberRegister);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //================================================

  //==================================================
  getallNotemaster: async (req, res, next) => {
    try {
      const getallNotemaster = await adminService.getallNotemaster(req.params);
      res.status(200).json(getallNotemaster);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  createGst: async (req, res, next) => {
    try {
      const createGst = await adminService.createGst(req.body);

      res.status(200).json(createGst);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getallGst: async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params);
    try {
      const getallGst = await adminService.getallGst(id);
      res.status(200).json(getallGst);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  updateGst: async (req, res, next) => {
    try {
      const updateGst = await adminService.updateGst(req.body);
      res.status(200).json(updateGst);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================
  //
  //
  // =========
  deleteGst: async (req, res, next) => {
    const { _id } = req.body;

    try {
      const deleteGst = await adminService.deleteGst(_id);
      res.status(200).json({
        message: "Deleted kitchen IDs successfully",
        deletedCount: deleteGst.deletedCount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   ===================================
  deliveryPartners: async (req, res, next) => {
    try {
      const deliveryPartners = await adminService.deliveryPartners(req.body);
      console.log(deliveryPartners);
      res.status(200).json({
        message: "created successfully",
        deliveryPartners: deliveryPartners.deliveryPartners,
        activate: deliveryPartners.activate,
        updatedeliveryPartners: deliveryPartners.updatedeliveryPartners,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   =================================
  getDeliveryPartners: async (req, res, next) => {
    const { id } = req.params;

    try {
      const getDeliveryPartners = await adminService.getDeliveryPartners(id);
      res.status(200).json({
        message: "fetched successfully",
        getDeliveryPartners,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ================================
  getAllDeliveryPartners: async (req, res, next) => {
    try {
      const getAllDeliveryPartners = await adminService.getAllDeliveryPartners(
        req.params
      );
      res.status(200).json({
        message: "fetched successfully",
        getAllDeliveryPartners,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ================================
  UpdatedeliveryPartners: async (req, res, next) => {
    try {
      const UpdatedeliveryPartners = await adminService.UpdatedeliveryPartners(
        req.body
      );
      res.status(200).json({
        message: "updated successfully",
        UpdatedeliveryPartners,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   =============
  ThirdPartyActivate: async (req, res, next) => {
    try {
      const ThirdPartyActivate = await adminService.ThirdPartyActivate(
        req.body
      );
      console.log(ThirdPartyActivate);
      res.status(200).json({
        message: "created successfully",
        activate: ThirdPartyActivate.activate,
        updatedeliveryPartners: ThirdPartyActivate.updatedeliveryPartners,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   ======================
  getThirdParty: async (req, res, next) => {
    const { id } = req.params;

    try {
      const getThirdParty = await adminService.getThirdParty(id);
      res.status(200).json({
        message: "fetched successfully",
        getThirdParty,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   ===================
  getAllThirdParty: async (req, res, next) => {
    try {
      const getAllThirdParty = await adminService.getAllThirdParty();
      res.status(200).json({
        message: "fetched successfully",
        getAllThirdParty,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   =====================
  onlineCustomer: async (req, res, next) => {
    try {
      const onlineCustomer = await adminService.onlineCustomer(req.body);
      console.log(onlineCustomer);
      res.status(200).json({
        message: "created successfully",
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ====================
  updateOrderStatus: async (req, res, next) => {
    try {
      const updateOrderStatus = await adminService.updateOrderStatus(req.body);
      // console.log(updateOrderStatus)
      res.status(200).json({
        message: "updateed successfully",
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //   =:====================
  getonlineCustomer: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getonlineCustomer = await adminService.getonlineCustomer(id);
      res.status(200).json({
        message: "fetched successfully",
        getonlineCustomer,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ====
  // getAllonlineCustomer: async (req, res, next) => {
  //   try {
  //     const getAllonlineCustomer = await adminService.getAllonlineCustomer();
  //     res.status(200).json({
  //       message: "fetched successfully",
  //       count:getAllonlineCustomer.length,
  //       getAllonlineCustomer,
  //     });
  //   } catch (error) {
  //     error.message = error.error;
  //     error.statuscode = 400;
  //     console.error(error);
  //     next(error);
  //   }
  // },

  getAllonlineCustomer: async (req, res, next) => {
    try {
      const { org_id, orderFrom, order_status, fromDate } = req.query;

      const getCustomer = await adminService.getAllonlineCustomer({
        org_id,
        orderFrom,
        order_status,
        fromDate,
      });

      return res.status(200).json({
        success: true,
        message: "Fetched successfully",
        count: getCustomer.length,
        data: getCustomer,
      });
    } catch (error) {
      console.error("Error fetching online customers:", error);
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ==:=================
  getLowStock: async (req, res, next) => {
    try {
      const getLowStock = await adminService.getLowStock(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getLowStock,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   =======================================
  outOfStock: async (req, res, next) => {
    try {
      const outOfStock = await adminService.outOfStock(req.params);
      console.log(outOfStock, "kk");
      res.status(200).json({
        message: "fetched successfully",
        outOfStock,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =====:
  getdeliverPartner: async (req, res, next) => {
    try {
      const getdeliverPartner = await adminService.getdeliverPartner(
        req.params
      );
      console.log(getdeliverPartner, "kk");
      res.status(200).json({
        message: "fetched successfully",
        getdeliverPartner,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  

  //   ========================
  getEmployeeCount: async (req, res, next) => {
    try {
      const getEmployee = await adminService.getEmployeeCount(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getEmployee,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ======
  /* getPopularDish: async (req, res, next) => {
    try {
      const getPopularDish = await adminService.getPopularDish(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getPopularDish,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getPopularDish: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter || "all"; // can be "day", "week", "month", "year", or "all"

      const getPopularDish = await adminService.getPopularDish({
        org_id,
        filterType,
      });

      res.status(200).json({
        message: "Fetched successfully",
        getPopularDish,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //   ====================
  /*  getCustomerCount: async (req, res, next) => {
    try {
      const getCustomerCount = await adminService.getCustomerCount(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getCustomerCount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getCustomerCount: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter;

      const getCustomerCount = await adminService.getCustomerCount({
        org_id,
        filterType,
      });

      res.status(200).json({
        message: "Fetched successfully",
        getCustomerCount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ===============
  /*  getCustomer: async (req, res, next) => {
    try {
      const getCustomer = await adminService.getCustomer(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getCustomer,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getCustomer: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter; // default to 'year'

      const getCustomer = await adminService.getCustomer({
        org_id,
        filterType,
      });

      res.status(200).json({
        message: "Fetched successfully",
        getCustomer,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =================================
  /* totalSaleAmount: async (req, res, next) => {
    try {
      const totalSaleAmount = await adminService.totalSaleAmount(req.params);
      res.status(200).json({
        message: "fetched successfully",
        totalSaleAmount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  totalSaleAmount: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter;

      const totalSaleAmount = await adminService.totalSaleAmount({
        org_id,
        filterType,
      });

      res.status(200).json({
        message: "Fetched successfully",
        totalSaleAmount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==================
  getSalesPurchase: async (req, res, next) => {
  try {
    const org_id = req.params.org_id;
    const filterType = req.query.filter;

    const getSalesPurchase = await adminService.getSalesPurchase({
      org_id,
      filterType,
    });

    res.status(200).json({
      message: "fetched successfully",
      getSalesPurchase,
    });
  } catch (error) {
    error.error = error.message;
    console.error(error);
    error.statuscode = 400;
    next(error);
  }
},


  // ================
  createDiscout: async (req, res, next) => {
    try {
      const createDiscout = await adminService.createDiscout(req.body);
      res.status(200).json({
        message: " successfully",
        createDiscout,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =======================
  getDiscount: async (req, res, next) => {
    try {
      const getDiscount = await adminService.getDiscount(req.params);
      res.status(200).json({
        message: " successfully",
        getDiscount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =========================
  updateDiscount: async (req, res, next) => {
    try {
      const updateDiscount = await adminService.updateDiscount(req.body);
      res.status(200).json({
        message: " successfully",
        updateDiscount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // =====================
  /*  dashboard: async (req, res, next) => {
    try {
       const org_id = req.params.org_id; // ✅ Correct way to get org_id from route
    const data = await adminService.dashboard({ org_id });
      // const dashboard = await adminService.dashboard(req.params);
      res.status(200).json({
        message: "fetched successfully",
        data,
      });
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  dashboard: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter;

      const data = await adminService.dashboard({ org_id, filterType });

      res.status(200).json({
        message: "Fetched successfully",
        data,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==========

  /*  getSale: async (req, res, next) => {
    const { org_id, filterType } = req.params;
    try {
      const getSale = await adminService.getSale(org_id, filterType);
      res.status(200).json({
        message: "fetched successfully",
        getSale,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getSale: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter || "all"; // daily / weekly / monthly / yearly / all

      const getSale = await adminService.getSale({ org_id, filterType });

      res.status(200).json({
        message: "Fetched successfully",
        getSale,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==================
  deleteDiscount: async (req, res, next) => {
    const { id: discount_id, org_id } = req.params;
    try {
      const deleteDiscount = await adminService.deleteDiscount({
        discount_id,
        org_id,
      });
      res.status(200).json({
        message: "fetched successfully",
        deleteDiscount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============================
  /* getSalesDiscout: async (req, res, next) => {
    try {
      const getSalesDiscout = await adminService.getSalesDiscout(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getSalesDiscout,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getSalesDiscout: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      // const filterType = req.query.filter;
      const item = req.query.item;

      const getSalesDiscout = await adminService.getSalesDiscout({
        org_id,
        // filterType,
        item,
      });

      res.status(200).json({
        message: "Fetched successfully",
        getSalesDiscout,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //=======================

  getIncomeExpense: async (req, res, next) => {
    try {
      const incomeExpense = await adminService.getIncomeExpense(req.params);

      res.status(200).json({
        message: "Fetched successfully",
        incomeExpense,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ===================
  /* getProfit: async (req, res, next) => {
    try {
      const getProfit = await adminService.getProfit(req.params);
      res.status(200).json({
        message: "fetched successfully",
        getProfit,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  }, */

  getProfit: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter;

      const getProfit = await adminService.getProfit({ org_id, filterType });

      res.status(200).json({
        message: "Fetched successfully",
        getProfit,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getPaymentMethods: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const filterType = req.query.filter;

      if (!org_id) {
        return res.status(400).json({ message: "Organization ID is required" });
      }

      const result = await adminService.getPaymentMethods({
        org_id,
        filterType,
      });

      return res.status(200).json({
        message: "Payment method distribution fetched successfully",
        paymentMethods: result,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==================
};
export default adminController;
