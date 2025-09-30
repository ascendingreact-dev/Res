
import kitchenController from "../../src/controller/kitchenController.js"
import express from "express";
import adminController from "../controller/adminController.js";

import authendiation from "../../authendiation.js";
import planCheckMiddleware from "../middleware/planCheckMiddleware.js";
const router=express.Router();


router.get("/getAllUserOrder/:org_id",planCheckMiddleware,kitchenController.getAllUserOrder);

router.get("/getTotalOreder/:org_id",planCheckMiddleware,kitchenController.getTotalOrder);

router.put("/updateStatusKds",planCheckMiddleware,kitchenController.updateStatusKds);// allow access for waiter

router.get("/getUserOrderHistory/:org_id",authendiation,planCheckMiddleware,kitchenController.getUserOrderHistory);

router.post("/getoverallDate",authendiation,planCheckMiddleware,kitchenController.getoverallDate);



// router.post("/getMenuitem",authendiation,kitchenController.getMenuitem);filter

// router.get("/getproductNameCategory",kitchenController.getproductNameCategory);

// router.delete("/removeOverallId",authendiation,kitchenController.removeOverallId);
// router.put("/updateUserOrder",authendiation,kitchenController.updateUserOrder);



// router.get("/getTablenameType",authendiation,kitchenController.getTablenameType);

    
export default router;

