import express from "express";
import accountController from '../../controller/Account/accountController.js'
import adminController from "../../controller/adminController.js";
import authendiation from "../../../authendiation.js"
import tableController from "../../controller/tableController.js";
import salesController from "../../controller/salesController.js";
const router = express.Router();

// ************* Save Bill ************
router.get("/cus_name/:ContactNo", accountController.getCusName)

router.post("/saveBill", accountController.saveBill);//worked
router.get("/getAllsavedBills", accountController.getAllsavedBills);//worked
router.post("/getAllsavedBillsBymonth",accountController.getAllsavedBillsBymonth);
router.delete("/deleteSavedBill", accountController.deleteSavedBillById);
router.get("/saveBillFilter",accountController.saveBillFilter);

router.put("/updateBillStatus",accountController.updateBillStatus);
router.get("/getBillsByDate/:org_id/:date", accountController.getBillsByDate)//worked;
router.post("/getBillsByWeek",accountController.getBillsByWeek);//worked
router.get("/getBillsByYear/:date", accountController.getBillsByYear);


router.get("/selectTablename",accountController.selectTablename);//bill generations

router.get("/dineinBill",accountController.dineinBill);



// router.post("/onlineRegister",salesController.onlineRegister);//online register


router.put("/updateOrderStatus",accountController.updateOrderStatus)

export default router;