import express from "express";
import tableController from "../../src/controller/tableController.js";
import salesController from "../../src/controller/salesController.js";
const router=express.Router();



router.post("/reservations",tableController.reservations);
router.get("/getReservations/:id",tableController.getReservations);
router.put("/updateReservations",tableController.updateReservations);
router.delete("/deleteReservations/:id",tableController.deleteReservations);
router.get("/overallReservations",tableController.overallReservations);


router.post("/tableAssignments",tableController.tableAssignments);
router.get("/getTableAssignments/:id",tableController.getTableAssignments);
router.put("/updateTableAssignments",tableController.updateTableAssignments);
router.get("/getallTablesAssignments",tableController.getallTablesAssignments);


router.post("/tableTurnover",tableController.tableTurnover);
router.get("/getTableTurnover/:id",tableController.getTableTurnover);
router.get("/getAlltableTurnover",tableController.getAlltableTurnover);


router.post("/waitingList",tableController.waitingList);
router.get("/getWaitingList/:id",tableController.getWaitingList);
router.put("/updateWaitingList",tableController.updateWaitingList);
router.get("/getAllwaitingList",tableController.getAllwaitingList);


router.post("/users",tableController.users);
router.get("/getUsers/:id",tableController.getUsers);
router.get("/getallUser",tableController.getallUser);
router.get("/auditTrails",tableController.auditTrails);


router.post("/tables",tableController.tables);
router.get("/getTables/:id",tableController.getTables);
router.put("/updateTables",tableController.updateTables);


router.get("/getOrder/:id",salesController.getOrder);
router.put("/updateOrder",salesController.updateOrder);

router.get("/getallSalesreport",salesController.getallSalesreport);


export default router;