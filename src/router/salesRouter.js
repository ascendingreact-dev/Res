import express from "express";
import salesController from "../../src/controller/salesController.js";
const router =express.Router();


router.post("/orders",salesController.ordersCretaed);
router.get("/getOrder/:id",salesController.getOrder);
router.put("/updateOrder",salesController.updateOrder);
router.get("/allOrdersFilter",salesController.allOrdersFilter);

router.post("/orderItems",salesController.createOrderitem);
router.get("/getOrderItems/:id",salesController.getOrderItems);
router.put("/updateOrderItems",salesController.updateOrderItems);
router.get("/getallitems",salesController.getallitems);

// router.post("/customers",salesController.createCustomerDetails);
router.get("/getCustomers/:id",salesController.getCustomers);
router.put("/updateCustomers",salesController.updateCustomers);
router.get("/getAllcustomers",salesController.getAllcustomers);

router.post("/payments",salesController.createPayments);
router.get("/getPayments/:id",salesController.getPayments);
router.get("/getallPayment",salesController.getallPayment);

router.post("/receipts",salesController.createReceipts);
router.get("/getReceipts/:id",salesController.getReceipts);
router.get("/getAllReceipts",salesController.getAllReceipts);

router.post("/salesReports",salesController.salesReportsCreate);
router.get("/getSalesReport/:id",salesController.getSalesReport);
router.get("/getallSalesreport",salesController.getallSalesreport);

router.post("/loyaltyPrograms",salesController.loyaltyProgramsCreate);
router.get("/getIdLoyaltyPrograms/:id",salesController.getIdLoyaltyPrograms);
router.get("/getAllLoyaltyProgram",salesController.getAllLoyaltyProgram);


export default router;