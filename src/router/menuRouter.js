import express from "express";
import menuController from "../../src/controller/menuController.js";

const router=express.Router();

// router.post("/menuItems",menuController.menuItems);
// router.get("/getmenuItem/:id",menuController.getmenuItem);
// router.put("/updateMenuitem",menuController.updateMenuitem);
// router.delete("/deleteMenuitem",menuController.deleteMenuitem);
// router.get("/categoryStatus",menuController.categoryStatus);


router.post("/categories",menuController.categories);
router.get("/getCategorie/:id",menuController.getCategorie);
router.put("/updateCategories",menuController.updateCategories);
router.delete("/deleteCategories",menuController.deleteCategories);
router.get("/gelallCategories",menuController.gelallCategories);


router.post("/specialOffers",menuController.specialOffers);
router.get("/getSpecialoffers/:id",menuController.getSpecialOffers);
router.put("/updateSpecialoffer",menuController.updateSpecialoffer);
router.delete("/removeSpecialoffers",menuController.removeSpecialoffers);
router.get("/overallOffers",menuController.overallOffers);


router.post("/comboDeals",menuController.comboDeals);
router.get("/getCombodeals/:id",menuController.getCombodeals);
router.put("/updateComboDeals",menuController.updateComboDeals);
router.delete("/deleteComboDeals",menuController.deleteComboDeals);
router.get("/overallCombodeals",menuController.overallCombodeals);


router.post("/menuItemCombos",menuController.menuItemCombos);
router.get("/getMenuItemCombos/:id",menuController.getMenuItemCombos);
router.delete("/removeMenuItemCombos",menuController.removeMenuItemCombos);
router.get("/getallmenuItemCombos",menuController.getallmenuItemCombos);


router.post("/salesReport",menuController.salesReports);
router.get("/getSalesReport/:id",menuController.getSalesReport);
router.get("/salesReportDate",menuController.salesReportDate);


router.post("/userRoles",menuController.userRoles);
router.get("/getUserrole/:id",menuController.getUserrole);
router.put("/updateuserRoles",menuController.updateuserRoles);
router.delete("/deleteuserRoles",menuController.deleteuserRoles);
router.get("/getallUserrole",menuController.getallUserrole);


router.post("/user",menuController.users);
router.get("/getUser/:id",menuController.getUser);
router.put("/updateUser",menuController.updateUser);
router.delete("/deleteUser",menuController.deleteUser);
router.get("/overallUser",menuController.overallUser);


router.post("/customerFeedback",menuController.customerFeedback);
router.get("/getcustomerFeedback/:id",menuController.getcustomerFeedback);
router.get("/getIdcustomerFeedback",menuController.getIdcustomerFeedback);



export default router;