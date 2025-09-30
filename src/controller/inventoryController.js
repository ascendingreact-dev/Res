import inventoryService from "../service/inventoryService.js";

const inventoryController = {
  inventory: async (req, res, next) => {
    try {
      const inventory = await inventoryService.inventory(req.body);
      res.status(200).json({
        message: "successfully",
        data: inventory,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //================================================================================================

  addOrPurchaseProduct: async (req, res, next) => {
    try {
      const inventory = await inventoryService.addOrPurchaseProduct(req.body);
      res.status(200).json({
        message: "successfully",
        data: inventory,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const products = await inventoryService.getAllProducts(req.params);
      res.status(200).json({
        message: "successfully",
        data: products,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const updateProduct = await inventoryService.updateProduct(req.body);
      res.status(200).json({
        message: "successfully",
        data: updateProduct,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const prod = await inventoryService.getProduct(req.params);
      res.status(200).json({
        message: "successfully",
        data: prod,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getUsageaUsers: async (req, res, next) => {
    try {
      const prod = await inventoryService.getUsageaUsers(req.params);
      res.status(200).json({
        message: "successfully",
        data: prod,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  usageInventory: async (req, res, next) => {
    try {
      const used = await inventoryService.usageInventory(req.body);
      res.status(200).json({
        message: "successfully",
        data: used,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getAllUsageHistory: async (req, res, next) => {
    try {
      const { org_id } = req.params;
      const { fromDate, toDate, action_type, used_by, Product_id} = req.query;
      const data = {
        org_id,
        fromDate,
        toDate,
        action_type,
        used_by,
        Product_id
      };

      const usageData = await inventoryService.getAllUsageHistory(data);

      res.status(200).json({
        message: "successfully",
        data: usageData,
      });
    } catch (error) {
      console.error(error);
      error.statuscode = 400;
      error.error = error.message;
      next(error);
    }
  },

  getSearchProd: async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      const startsWith = req.query.startsWith;

      const prod = await inventoryService.getSearchProd({ org_id, startsWith });

      res.status(200).json({
        message: "Products fetched successfully",
        data: prod,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      error.statuscode = 400;
      next(error);
    }
  },

  deleteUsageHistory: async (req, res, next) => {
    try {
      const deletedUsage = await inventoryService.deleteUsageHistory(req.body);
      res.status(200).json({
        message: "successfully",
        data: deletedUsage,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getPurchaseHistory: async (req, res, next) => {
    try {
      const { org_id } = req.params;
      const { fromDate, toDate } = req.query;
      const data = {
        org_id,
        fromDate,
        toDate,
      };
      const purchaseHistory = await inventoryService.getPurchaseHistory(data);
      res.status(200).json({
        message: "successfully",
        data: purchaseHistory,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getSingleProdPurchase: async (req, res, next) => {
    try {
       const { org_id, Product_id} = req.params;
        const { fromDate, toDate } = req.query;
      const purchaseHistory = await inventoryService.getSingleProdPurchase({org_id, Product_id, fromDate, toDate });
      res.status(200).json({
        message: "successfully",
        data: purchaseHistory,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      error.statuscode = 400;
      next(error);
    }
  },

  deletepurchase: async (req, res, next) => {
    try {
      const deletedPurchase = await inventoryService.deletepurchase(req.body);
      res.status(200).json({
        message: "successfully",
        data: deletedPurchase,
      });
    } catch (error) {
      console.error(error);
      error.error = error.message;
      console.log(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //=======================================================================================

  getinventory: async (req, res, next) => {
    const { id } = req.params;
    try {
      const inventory = await inventoryService.getinventory(id);
      res.status(200).json({
        data: inventory,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==============
  updateInventory: async (req, res, next) => {
    try {
      const updatedInventory = await inventoryService.updateInventory(req.body);
      res.status(200).json({
        message: "Updated successfully",
        data: updatedInventory,
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      const err = new Error("Failed to update inventory");
      err.statuscode = 500;
      next(err);
    }
  },

  // ================
  /* deleteinventory: async (req, res, next) => {
    const {id:inventory_id, org_id} = req.params
    try {
      const deleteProduct = await inventoryService.deleteinventory({inventory_id, org_id});
      res.status(200).json({
        message: "Delete Product Entry",
        data: deleteProduct,
      });
    } catch (error) {
      error.message = error.error;
      error.statuscode = 400;
      console.error(error);
      next(error);
    }
  }, */

  deleteinventory: async (req, res, next) => {
    const { id: Product_id, org_id } = req.params;
    try {
      const deleteProduct = await inventoryService.deleteinventory({
        Product_id,
        org_id,
      });
      res.status(200).json({
        message: "Delete Product Entry",
        data: deleteProduct,
      });
    } catch (error) {
      error.error = error.message;
      error.statuscode = 400;
      console.error(error);
      next(error);
    }
  },

  // ===
  getallInventory: async (req, res, next) => {
    try {
      const getallProductEntry = await inventoryService.getallInventory(
        req.params
      );
      res.status(200).json(getallProductEntry);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===========================================
  suppliers: async (req, res, next) => {
    const { supplier_name, contact_information, address } = req.body;
    try {
      const suppliers = await inventoryService.suppliers(req.body);
      res.status(200).json({
        message: "successfully",
        data: suppliers,
      });
    } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getSuppliers: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getSuppliers = await inventoryService.getSuppliers(id);
      res.status(200).json({
        data: getSuppliers,
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);

      const err = new Error("Failed to fetch inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // =============================
  updateSuppliers: async (req, res, next) => {
    const { id } = req.params;
    const { supplier_name, contact_information, address } = req.body;
    console.log(req.body, "kj");

    try {
      const updateSuppliers = await inventoryService.updateSuppliers(
        id,
        req.body
      );
      res.status(200).json({
        message: "Updated successfully",
        data: updateSuppliers,
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      const err = new Error("Failed to update inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // ================================
  getAllSuppliers: async (req, res, next) => {
    const { supplier_name, contact_information, address } = req.body;
    try {
      const getAllSuppliers = await inventoryService.getAllSuppliers(req.body);
      res.status(200).json({
        success: true,
        data: getAllSuppliers,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ==========================
  purchaseOrders: async (req, res, next) => {
    const { supplier_id, status, total_amount } = req.body;
    try {
      const purchaseOrders = await inventoryService.purchaseOrders(req.body);
      res.status(200).json({
        message: "successfully",
        data: purchaseOrders,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getPurchaseOrders: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getPurchaseOrders = await inventoryService.getPurchaseOrders(id);
      res.status(200).json({
        data: getPurchaseOrders,
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);

      const err = new Error("Failed to fetch inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // =============================
  updatePurchaseOrder: async (req, res, next) => {
    const { id } = req.params;
    const { supplier_id, status, total_amount } = req.body;
    console.log(req.body, "kj");

    try {
      const updateSuppliers = await inventoryService.updatePurchaseOrder(
        id,
        req.body
      );
      res.status(200).json({
        message: "Updated successfully",
        data: updateSuppliers,
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      const err = new Error("Failed to update inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // ================================
  getAllPurchaseOrder: async (req, res, next) => {
    const { startDate, endDate, status } = req.body;

    try {
      // Fetch purchase orders with optional filters
      const purchaseOrders = await inventoryService.getAllPurchaseOrder({
        startDate,
        endDate,
        status,
      });

      // Send the response with the data
      res.status(200).json({
        success: true,
        data: purchaseOrders,
      });
    } catch (error) {
      // Log the error
      console.error("Error fetching purchase orders:", error);

      // Pass the error to the error-handling middleware
      next({
        status: 500,
        message: "Error fetching purchase orders",
      });
    }
  },
  // =====================
  purchaseOrderItems: async (req, res, next) => {
    const { PurchaseOrder_id, product_id, quantity, price } = req.body;
    try {
      const purchaseOrderItems = await inventoryService.purchaseOrderItems(
        req.body
      );
      res.status(200).json({
        message: "successfully",
        data: purchaseOrderItems,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getpurchaseOrderItems: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getpurchaseOrderItems =
        await inventoryService.getpurchaseOrderItems(id);
      res.status(200).json({
        data: getpurchaseOrderItems,
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);

      const err = new Error("Failed to fetch inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // =============================
  updatepurchaseOrderItems: async (req, res, next) => {
    const { id } = req.params;
    const { order_id, product_id, quantity, price } = req.body;
    console.log(req.body, "kj");

    try {
      const updatepurchaseOrderItems =
        await inventoryService.updatepurchaseOrderItems(id, req.body);
      res.status(200).json({
        message: "Updated successfully",
        data: updatepurchaseOrderItems,
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      const err = new Error("Failed to update inventory");
      err.statuscode = 500;
      next(err);
    }
  },
  // ================================
  getAllpPurchaseOrderItems: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAllpPurchaseOrderItems =
        await inventoryService.getAllpPurchaseOrderItems(req.body);
      res.status(200).json({
        success: true,
        data: getAllpPurchaseOrderItems,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ====================
  locations: async (req, res, next) => {
    const { location_name, address } = req.body;
    try {
      const locations = await inventoryService.locations(req.body);
      res.status(200).json({
        message: "successfully",
        data: locations,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getlocations: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getlocations = await inventoryService.getlocations(id);
      res.status(200).json({
        data: getlocations,
      });
    } catch (error) {
      console.error("Error fetching getlocations:", error);

      const err = new Error("Failed to fetch getlocations");
      err.statuscode = 500;
      next(err);
    }
  },
  // =============================
  updatelocations: async (req, res, next) => {
    const { id } = req.params;
    const { location_name, address } = req.body;
    console.log(req.body, "kj");

    try {
      const updatelocations = await inventoryService.updatelocations(
        id,
        req.body
      );
      res.status(200).json({
        message: "Updated successfully",
        data: updatelocations,
      });
    } catch (error) {
      console.error("Error updating locations:", error);
      const err = new Error("Failed to update locations");
      err.statuscode = 500;
      next(err);
    }
  },
  // ================================
  getAlllocations: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAlllocations = await inventoryService.getAlllocations(req.body);
      res.status(200).json({
        success: true,
        data: getAlllocations,
      });
    } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ====================================
  inventoryMovements: async (req, res, next) => {
    const { inventory_id, movement_type, quantity, movement_date } = req.body;
    try {
      const inventoryMovements = await inventoryService.inventoryMovements(
        req.body
      );
      res.status(200).json({
        message: "successfully",
        data: inventoryMovements,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getinventoryMovements: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getinventoryMovements =
        await inventoryService.getinventoryMovements(id);
      res.status(200).json({
        data: getinventoryMovements,
      });
    } catch (error) {
      console.error("Error fetching getinventoryMovements:", error);

      const err = new Error("Failed to fetch getinventoryMovements");
      err.statuscode = 500;
      next(err);
    }
  },

  // ================================
  getAllinventoryMovements: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAllinventoryMovements =
        await inventoryService.getAllinventoryMovements(req.body);
      res.status(200).json({
        success: true,
        data: getAllinventoryMovements,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // =========================
  stockValuationReports: async (req, res, next) => {
    const { total_value, report_data } = req.body;
    try {
      const stockValuationReports =
        await inventoryService.stockValuationReports(req.body);
      res.status(200).json({
        message: "successfully",
        data: stockValuationReports,
      });
    } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getstockValuationReports: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getstockValuationReports =
        await inventoryService.getstockValuationReports(id);
      res.status(200).json({
        data: getstockValuationReports,
      });
    } catch (error) {
      console.error("Error fetching getstockValuationReports:", error);

      const err = new Error("Failed to fetch getstockValuationReports");
      err.statuscode = 500;
      next(err);
    }
  },

  // ================================
  getAllstockValuationReports: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAllstockValuationReports =
        await inventoryService.getAllstockValuationReports(req.body);
      res.status(200).json({
        success: true,
        data: getAllstockValuationReports,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ---------------------
  usageReports: async (req, res, next) => {
    const { total_value, report_data } = req.body;
    try {
      const usageReports = await inventoryService.usageReports(req.body);
      res.status(200).json({
        message: "successfully",
        data: usageReports,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getusageReports: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getusageReports = await inventoryService.getusageReports(id);
      res.status(200).json({
        data: getusageReports,
      });
    } catch (error) {
      console.error("Error fetching getusageReports:", error);

      const err = new Error("Failed to fetch getusageReports");
      err.statuscode = 500;
      next(err);
    }
  },

  // ================================
  getAllusageReports: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAllusageReports = await inventoryService.getAllusageReports(
        req.body
      );
      res.status(200).json({
        success: true,
        data: getAllusageReports,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ----------------------------------------------
  auditReports: async (req, res, next) => {
    const { total_value, report_data } = req.body;
    try {
      const auditReports = await inventoryService.auditReports(req.body);
      res.status(200).json({
        message: "successfully",
        data: auditReports,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // ===============
  getauditReports: async (req, res, next) => {
    const { id } = req.params;
    try {
      const getauditReports = await inventoryService.getauditReports(id);
      res.status(200).json({
        data: getauditReports,
      });
    } catch (error) {
      console.error("Error fetching getauditReports:", error);

      const err = new Error("Failed to fetch getauditReports");
      err.statuscode = 500;
      next(err);
    }
  },

  // ================================
  getAllauditReports: async (req, res, next) => {
    const filters = req.body;
    try {
      const getAllauditReports = await inventoryService.getAllauditReports(
        req.body
      );
      res.status(200).json({
        success: true,
        data: getAllauditReports,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
};
export default inventoryController;
