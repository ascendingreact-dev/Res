import express from "express";
import adminController from "../../src/controller/adminController.js";
import salesController from "../controller/salesController.js";

import authendiation from "../../authendiation.js";
import inventoryController from "../controller/inventoryController.js";
import planCheckMiddleware from "../../src/middleware/planCheckMiddleware.js"
const router = express.Router();

router.post("/createApp",adminController.createApp);
router.get("/getApp",adminController.getApp);
// router.put("/updateApp",adminController.updateApp);c
// router.delete("/deleteApp/:id",adminController.deleteApp);
// router.post("/status",adminController.status);
router.put("/updatestatus",adminController.updatestatus);
// router.delete("/deletestatus",adminController.deletestatus);

// router.post("/createCategory",adminController.createCategory);
router.get("/getAllCategory",adminController.getAllCategory);
// router.put("/updateCategory",adminController.updateCategory);
// router.delete("/deleteCategory/:id",adminController.deleteCategory);

router.post("/register",adminController.register);
router.post("/login",adminController.login);
router.put("/updatePassword",adminController.updatePassword);

router.get("/getorganisation",adminController.getOrganisation)
router.get("/getOverAllorganisation",adminController.getOverAllorganisation);
router.delete("/deleteOrganization",adminController.deleteOrganization);

//profile
router.get("/getProfile/:org_id/:admin_id", adminController.getProfile)
router.put("/updateProfile",adminController.updateProfile)

router.get("/getRemainingUserCount/:org_id", adminController.getRemainingUserCount)

 router.post("/menuCategory", planCheckMiddleware,adminController.menuCategory);
//new
router.get("/getOneCategory/:org_id/:menu_Category_id",planCheckMiddleware, adminController.getMenuCategory)
router.get("/getmenuCategory/:org_id", planCheckMiddleware, adminController.getAllCategoryList)
router.put("/updateMenuCategory", authendiation,planCheckMiddleware, adminController.updateMenuCategory)
router.delete("/deleteMenuCategory/:org_id/:menu_Category_id", planCheckMiddleware,adminController.deleteMenuCategory)
//
router.post("/createMenuItem",planCheckMiddleware,adminController.createMenuItem);

router.put("/menuitemUpdate",planCheckMiddleware,adminController.menuitemUpdate);

router.post("/deleteMenuitem",authendiation,planCheckMiddleware,adminController.deleteMenuitem);
router.get("/getMenuitem/:id",authendiation,adminController.getMenuitem);
router.get("/getoverallMenuitem/:org_id",authendiation,adminController.getoverallMenuitem);
router.delete("/deleteMenu/:org_id/:id",planCheckMiddleware,adminController.deleteMenu);

// router.post("/register",adminController.register);
// router.put("/updateUserdetails",adminController.updateUserdetails);

router.get("/getOverAllroomsAndtables",authendiation,adminController.getOverAllroomsAndtables);


// router.post("/icon",adminController.iconandNameCreated);
// router.get("/geticon/:id",adminController.geticon);
// router.get("/getOverallDetails",adminController.getOverallDetails);
// router.put("/updateIcon",adminController.updateIcon);
// router.delete("/deleteIcon/:id",adminController.deleteIcon);

router.post("/sendEmail",adminController.sendEmail);
   
router.get("/getOverallOrder",authendiation,adminController.getOverallOrder);
router.get("/gatallOrderItems",authendiation,adminController.gatallOrderItems);
router.get("/getallPayments",authendiation,adminController.getallPayments);
router.get("/getallReceipts",authendiation,adminController.getallReceipts);
router.get("/getallSalesReport",authendiation,adminController.getallSalesReport);
router.get("/getAllLoyaltyPrograms",authendiation,adminController.getAllLoyaltyPrograms);
router.get("/getallTables",authendiation,adminController.getallTables);



//user registration
router.post("/createUser",planCheckMiddleware,authendiation,salesController.createUser);
router.put("/updateUser",planCheckMiddleware,authendiation,salesController.updateUser);
router.delete("/deleteUserId/:org_id",planCheckMiddleware,salesController.deleteUserId);
router.get("/getallUser/:org_id",salesController.getallUser);
router.get("/getSingleUser/:org_id", salesController.getSingleUser)


//schedules:staf management
router.post("/schedules",authendiation,salesController.schedules);
router.get("/getSchedules/:id",authendiation,salesController.getSchedules);
router.put("/updateSchedules",authendiation,salesController.updateSchedules);
router.get("/getEmployee",authendiation,salesController.getEmployee);

//TimeOffRequests:staf management
router.post("/TimeOffRequests",authendiation,salesController.TimeOffRequests);
router.get("/getTimeOffRequests/:id",authendiation,salesController.getTimeOffRequests);
router.put("/updateTimeOffRequests",authendiation,salesController.updateTimeOffRequests);
router.get("/filterTimeOffRequests",authendiation,salesController.filterTimeOffRequests);

//Tasks:staf management
router.post("/Tasks",salesController.Tasks);
router.get("/getTask/:id",salesController.getTask);
router.put("/updateTask",salesController.updateTask);
router.get("/filterTask",salesController.filterTask);

//member registaions
router.post("/memberRegistation",adminController.memberRegistation);
router.put("/updateRegistation",adminController.updateRegistation);
router.delete("/deleteRegistation/:org_id/:id",adminController.deleteRegistation);
router.get("/getallmembers",adminController.getallmembers);

// new inventory

router.post("/purchaseInventory",planCheckMiddleware,inventoryController.addOrPurchaseProduct);
router.get("/getProducts/:org_id", inventoryController.getAllProducts)
router.put("/updateProduct", inventoryController.updateProduct)
router.get("/product/:org_id/:Product_id", inventoryController.getProduct)

router.get("/inventoryUsageUser/:org_id", inventoryController.getUsageaUsers)
router.delete("/deleteinventory/:org_id/:id",planCheckMiddleware,inventoryController.deleteinventory);
router.post("/usageProds",inventoryController.usageInventory)
router.get("/getUsedInventory/:org_id", inventoryController.getAllUsageHistory)
router.get("/getSearchProd/:org_id", inventoryController.getSearchProd)
router.delete("/deleteUsage",inventoryController.deleteUsageHistory)

router.get("/purchaseHistory/:org_id", inventoryController.getPurchaseHistory)
router.get("/singlePurchse/:org_id/:Product_id", inventoryController.getSingleProdPurchase)
router.delete("/deletePurchase", inventoryController.deletepurchase)


//===============================================================================================

router.post("/inventory",planCheckMiddleware,authendiation,inventoryController.inventory);
router.get("/getinventory/:id",authendiation,inventoryController.getinventory);
// router.delete("/deleteinventory/:org_id/:id",planCheckMiddleware,authendiation,inventoryController.deleteinventory);
router.put("/updateInventory",planCheckMiddleware,authendiation,inventoryController.updateInventory);
router.get("/getallInventory/:org_id",authendiation,inventoryController.getallInventory); 

router.post("/notesMaster",planCheckMiddleware,authendiation,adminController.notesMaster);
router.put("/updateNotesmaster",planCheckMiddleware,authendiation,adminController.updateNotesmaster);
router.delete("/deleteNotemaster/:org_id/:id",planCheckMiddleware,authendiation,adminController.deleteNotemaster);
router.get("/getallNotemaster/:org_id",authendiation,adminController.getallNotemaster);


// router.post("/createGst",adminController.createGst);no use
router.get("/getallGst/:id",adminController.getallGst);
router.put("/updateGst",planCheckMiddleware,adminController.updateGst);
// router.delete("/deleteGst",adminController.deleteGst); 


router.post("/deliveryPartners",planCheckMiddleware,adminController.deliveryPartners);
router.get("/getDeliveryPartners/:id",adminController.getDeliveryPartners);
router.get("/getAllDeliveryPartners/:org_id",adminController.getAllDeliveryPartners);
router.put("/UpdatedeliveryPartners",planCheckMiddleware,adminController.UpdatedeliveryPartners);

router.post("/ThirdPartyActivate",adminController.ThirdPartyActivate);
router.get("/getThirdParty/:id",adminController.getThirdParty);
router.get("/getAllThirdParty",adminController.getAllThirdParty);

router.post("/onlineCustomer",adminController.onlineCustomer);
router.put("/updateOrderStatus",adminController.updateOrderStatus);
router.get("/getonlineCustomer/:id",adminController.getonlineCustomer);
router.get("/getAllonlineCustomer",adminController.getAllonlineCustomer);

// router.get("/getOnlineCus", adminController.getOnlineCustomer)



router.post("/createDiscout",planCheckMiddleware,adminController.createDiscout);
router.get("/getALLDiscount/:org_id",adminController.getDiscount);
router.put("/updateDiscount",planCheckMiddleware,adminController.updateDiscount);
router.delete("/deleteDiscount/:org_id/:id",planCheckMiddleware,adminController.deleteDiscount);

//dashboard
router.get("/getLowStock/:org_id",adminController.getLowStock);
router.get("/outOfStock/:org_id",adminController.outOfStock);
router.get("/getdeliverPartner/:org_id",adminController.getdeliverPartner);
router.get("/getEmployeeCount/:org_id",adminController.getEmployeeCount);
router.get("/getPopularDish/:org_id",adminController.getPopularDish);//*
router.get("/getCustomerCount/:org_id",adminController.getCustomerCount);//*
router.get("/getCustomer/:org_id",adminController.getCustomer);//for customer map chart //*
router.get("/totalSaleAmount/:org_id",adminController.totalSaleAmount);//online,shop //*
router.get("/getSalesPurchase/:org_id",adminController.getSalesPurchase);//*
router.get("/getSalesDiscout/:org_id",adminController.getSalesDiscout);//*
router.get("/getIncomeExpense/:org_id",adminController.getIncomeExpense)
// router.get("/getSale/:org_id/:filterType",adminController.getSale);//get sale and purchase ans profit, loss
router.get("/getSale/:org_id",adminController.getSale);
router.get("/getProfit/:org_id",adminController.getProfit);
router.get("/getPaymentMethod/:org_id",adminController.getPaymentMethods)
router.get("/dashboard/:org_id",adminController.dashboard);


export default router;
