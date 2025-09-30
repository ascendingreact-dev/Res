import express from "express";
import inventoryController from "../../src/controller/inventoryController.js"
import planCheckMiddleware from "../middleware/planCheckMiddleware.js";
const router=express.Router();

router.post("/inventory",planCheckMiddleware,inventoryController.inventory);
router.get("/getinventory/:id",planCheckMiddleware,inventoryController.getinventory);
// router.put("/updateInventory/:id",inventoryController.updateInventory);
// router.get("/getAllInventory",inventoryController.getAllInventory); //pending

router.post("/suppliers",inventoryController.suppliers)
router.get("/getSuppliers/:id",inventoryController.getSuppliers)
router.put("/updateSuppliers/:id",inventoryController.updateSuppliers);
router.get("/getAllSuppliers",inventoryController.getAllSuppliers);

router.post("/purchaseOrders",inventoryController.purchaseOrders)
router.get("/getPurchaseOrders/:id",inventoryController.getPurchaseOrders)
router.put("/updatePurchaseOrder/:id",inventoryController.updatePurchaseOrder);
router.get("/getAllPurchaseOrder",inventoryController.getAllPurchaseOrder); //filter the data based on start date ,end date

router.post("/purchaseOrderItems",inventoryController.purchaseOrderItems)
router.get("/getPurchaseOrderItems/:id",inventoryController.getpurchaseOrderItems)
router.put("/updatePurchaseOrderItems/:id",inventoryController.updatepurchaseOrderItems);
router.get("/getAllpPurchaseOrderItems",inventoryController.getAllpPurchaseOrderItems);


router.post("/locations",inventoryController.locations)
router.get("/getlocations/:id",inventoryController.getlocations)
router.put("/updatelocations/:id",inventoryController.updatelocations);
router.get("/getAlllocations",inventoryController.getAlllocations);


router.post("/inventoryMovements",inventoryController.inventoryMovements)
router.get("/getinventoryMovements/:id",inventoryController.getinventoryMovements)
router.get("/getAllinventoryMovements",inventoryController.getAllinventoryMovements);


router.post("/stockValuationReports",inventoryController.stockValuationReports)
router.get("/getstockValuationReports/:id",inventoryController.getstockValuationReports)
router.get("/getAllstockValuationReports",inventoryController.getAllstockValuationReports);


router.post("/usageReports",inventoryController.usageReports)
router.get("/getusageReports/:id",inventoryController.getusageReports)
router.get("/getAllusageReports",inventoryController.getAllusageReports);


router.post("/auditReports",inventoryController.auditReports)
router.get("/getauditReports/:id",inventoryController.getauditReports)
router.get("/getAllauditReports",inventoryController.getAllauditReports);

export default router