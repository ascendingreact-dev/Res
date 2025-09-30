import express from "express";
import adminController from "../../src/controller/adminController.js";
import tableController from "../../src/controller/tableController.js";
import kitchenController from "../../src/controller/kitchenController.js";

import authendiation from "../../authendiation.js";
import planCheckMiddleware from "../middleware/planCheckMiddleware.js";

const router = express.Router();

//new

router.get("/waiterTable/:org_id/:EmailId",planCheckMiddleware, tableController.getWaiterTables)

//=================================



//router.get("/getproductDetails",adminController.getproductDetails);
router.post("/users",authendiation,planCheckMiddleware,tableController.users);


router.post("/mergeUserOrder",planCheckMiddleware,tableController.checkUserOrder)

router.put("/updateStatusKds",planCheckMiddleware,kitchenController.updateStatusKds);

router.put("/updateStatus",authendiation,planCheckMiddleware,tableController.updateStatus);
router.post("/getUserorder",planCheckMiddleware,tableController.getUserorder);
router.delete("/removeDishbyTableId",authendiation,planCheckMiddleware,tableController.removeDishbyTableId);

router.get("/getuserorderTable/:table_id",authendiation,planCheckMiddleware,tableController.getuserorderTable);
router.put("/updateQuantity",authendiation,planCheckMiddleware,tableController.updateQuantity);

export default router