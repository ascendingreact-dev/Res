import express from "express";
import adminController from "../controller/adminController.js";
import authendiation from "../../authendiation.js";
import salesController from "../controller/salesController.js";
import kitchenController from "../controller/kitchenController.js";
import tableController from "../controller/tableController.js";
import planCheckMiddleware from "../middleware/planCheckMiddleware.js";
const router = express.Router();


router.post("/userCommonregister",adminController.userCommonregister);
router.post("/userCommonlogin",adminController.userCommonlogin);
router.post("/userregister",planCheckMiddleware,adminController.userregister);

router.post("/userlogin",planCheckMiddleware,adminController.userlogin);

router.get("/allUser/:org_id/:admin_id", adminController.getUser)

router.put("/userUpdatePassword",planCheckMiddleware,adminController.userUpdatePassword);
router.delete("/deleteuserdetails/:org_id/:id",planCheckMiddleware,adminController.deleteuserdetails);

router.get("/getmenuItems/:org_id/:Category",adminController.getmenuItems);//for addmin &waiter

router.get("/getoverallMenuitem/:org_id",adminController.getoverallMenuitem);//menu items //for admin,acc,kit

router.put("/updateMenuName",authendiation,planCheckMiddleware,kitchenController.updateMenuName);//ffor admin,kit
router.get("/MenuitemCategory/:org_id",adminController.MenuitemCategory);//for admin,waiter


//new




//=================================================================================================


router.post("/createRoomcategory",planCheckMiddleware,adminController.createRoomcategory);//add tables//for admin,acc
router.get("/getRoomsAndTables/:org_id",adminController.getRoomsAndTables);  // id means admin ids   //for admin,acc

router.put("/updatesubroomsandtable",planCheckMiddleware,adminController.updatesubroomsandtable);//for admin,acc


router.delete("/deleteTable/:org_id/:id",planCheckMiddleware,authendiation,adminController.deleteTable); //for admin,acc

//customer   //fro admin,acc 
router.post("/createCustomer",planCheckMiddleware,salesController.createCustomer);
router.put("/updateCustomers",planCheckMiddleware,salesController.updateCustomers);//customer registation update and online registation
router.get("/getCustomers/:id",authendiation,salesController.getCustomers);//curtomer register and online customer register
router.get("/getAllcustomers",authendiation,salesController.getAllcustomers);//filter in customer name and contact number
router.delete("/deleteCustomer/:org_id/:id",planCheckMiddleware,salesController.deleteCustomer);//customer registation delete and online registation


router.get("/getAllstatus",planCheckMiddleware,adminController.getAllstatus);//for admin,acc,waiter



router.post("/userOrder",planCheckMiddleware,tableController.userOrder);//for waiter,acc
router.get("/getAllOrder/:org_id",tableController.getAllOrder)
router.delete("/deleteUserOrder", tableController.deleteUserOrder)



export default router
