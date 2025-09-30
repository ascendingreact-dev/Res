import menuService from "../../src/service/menuService.js";

const menuController={
    menuItems:async(req,res,next)=>{
        try{
            const createMenuitem=await menuService.menuItems(req.body);
            res.status(200).json({
                message:"menuitems created successfully",
                data:createMenuitem
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================
    getmenuItem:async(req,res,next)=>{
        try{
            const getIdmenu=await menuService.getmenuItem(req.params.id);
            res.status(200).json({
                message:"get menuitems",
                data:getIdmenu});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===================================
    updateMenuitem:async(req,res,next)=>{
        try{
            const putMenuItem=await menuService.updateMenuitem(req.body);
            res.status(200).json({
                message:"updater menuitems",
                data:putMenuItem});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //======================================
    deleteMenuitem:async(req,res,next)=>{
        const {menu_item_id}=req.body;
        try{
            const removeMenuItem=await menuService.deleteMenuitem(menu_item_id);
            res.status(200).json({
                message:"delete menuitems",
                data:removeMenuItem});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //============================================
    categoryStatus:async(req,res,next)=>{
        const {category_id,status}=req.body;
        try{
            const getCategorystatus=await menuService.categoryStatus(category_id,status);
            res.status(200).json({
                message:"category and status",
                data:getCategorystatus});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==============================================
    categories:async(req,res,next)=>{
        try{
            const createCategories=await menuService.categories(req.body);
            res.status(200).json({
                message:"menuitems created successfully",
                data:createCategories
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=======================================================
    getCategorie:async(req,res,next)=>{
        try{
            const getIdCategory=await menuService.getCategorie(req.params.id);
            res.status(200).json({
                message:"get categories",
                data:getIdCategory});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==========================================================
    updateCategories:async(req,res,next)=>{
        try{
            const putCategories=await menuService.updateCategories(req.body);
            res.status(200).json({
                message:"updater Categories",
                data:putCategories});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=============================================================
    deleteCategories:async(req,res,next)=>{
        const {category_id}=req.body;
        try{
            const removeCategories=await menuService.deleteCategories(category_id);
            res.status(200).json({
                message:"delete menuitems",
                data:removeCategories});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //========================================
    gelallCategories:async(req,res,next)=>{
        try{
            const getallCategory=await menuService.gelallCategories();
            res.status(200).json({
                message:"get all categories",
                data:getallCategory});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //========================================
    specialOffers:async(req,res,next)=>{
        try{
            const createSpecialOffers=await menuService.specialOffers(req.body);
            res.status(200).json({
                message:"specialOffers created successfully",
                data:createSpecialOffers
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================
    getSpecialOffers:async(req,res,next)=>{
        try{
            const getSpecialOffer=await menuService.getSpecialOffers(req.params.id);
            res.status(200).json({
                message:"get special offers",
                data:getSpecialOffer});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //======================================
    updateSpecialoffer:async(req,res,next)=>{
        try{
            const putSpecialoffers=await menuService.updateSpecialoffer(req.body);
            res.status(200).json({
                message:"updater special offers",
                data:putSpecialoffers});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //========================================
    removeSpecialoffers:async(req,res,next)=>{
        const {offer_id}=req.body;
        try{
            const removeOffers=await menuService.removeSpecialoffers(offer_id);
            res.status(200).json({
                message:"delete special offers",
                data:removeOffers});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //============================================
    overallOffers:async(req,res,next)=>{
        try{
            const getallOfferws=await menuService.overallOffers();
            res.status(200).json({
                message:"get all offers",
                data:getallOfferws});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=======================================
    comboDeals:async(req,res,next)=>{
        try{
            const createCombo=await menuService.comboDeals(req.body);
            res.status(200).json({
                message:"Combodeals created successfully",
                data:createCombo
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================
    getCombodeals:async(req,res,next)=>{
        try{
            const getCombodeals=await menuService.getCombodeals(req.params.id);
            res.status(200).json({
                message:"get combo deals",
                data:getCombodeals});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=============================================
    updateComboDeals:async(req,res,next)=>{
        try{
            const putCombodeals=await menuService.updateComboDeals(req.body);
            res.status(200).json({
                message:"updater special offers",
                data:putCombodeals});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=============================================
    deleteComboDeals:async(req,res,next)=>{
        const {combo_id}=req.body;
        try{
            const removeCombodeals=await menuService.deleteComboDeals(combo_id);
            res.status(200).json({
                message:"delete combo deals",
                data:removeCombodeals});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===========================================
    overallCombodeals:async(req,res,next)=>{
        try{
            const getallCombodeals=await menuService.overallCombodeals();
            res.status(200).json({
                message:"get all combodeals",
                data:getallCombodeals});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=================================================
    menuItemCombos : async (req, res, next) => {
    try {
        const { combo_id, menu_item_ids } = req.body;

        // Validate input
        if (!combo_id || !Array.isArray(menu_item_ids)) {
            return res.status(400).json({ message: "Invalid input" });
        }

        // Call service to add items
        const result = await menuService.menuItemCombos(combo_id, menu_item_ids);

        res.status(200).json({
            message: "Items added to combo deal successfully",
            data: result
        });
    } catch (error) {
        error.error = error.message;
        error.statuscode = 400;
        console.error(error);
        next(error);
    }
    },
    //==============================================
    getMenuItemCombos:async(req,res,next)=>{
        try{
            const getMenuitem=await menuService.getMenuItemCombos(req.params.id);
            res.status(200).json({
                message:"get combo deals",
                data:getMenuitem});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==================================================
    removeMenuItemCombos:async(req,res,next)=>{
        const {combo_item_id}=req.body;
        try{
            const removeMenuitems=await menuService.removeMenuItemCombos(combo_item_id);
            res.status(200).json({
                message:"delete details",
                data:removeMenuitems});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==========================================================
    getallmenuItemCombos:async(req,res,next)=>{
        try{
            const getallMenuitems=await menuService.getallmenuItemCombos();
            res.status(200).json({
                message:"get all menuitems",
                data:getallMenuitems});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //========================================================
    salesReports:async(req,res,next)=>{
        try {
            const { startDate, endDate } = req.body;
            
            // Validate and sanitize input dates
            if (startDate && !Date.parse(startDate)) {
                throw new Error("Invalid startDate format");
            }
            if (endDate && !Date.parse(endDate)) {
                throw new Error("Invalid endDate format");
            }        
            const salesReports = await menuService.salesReportDate({ startDate, endDate });
            res.status(200).json(salesReports);
        } catch (error) {
            console.error("Error retrieving sales reports:", error.message);
            error.statusCode = 400;
            next(error);
        }
    },
    //==============================================================
    getSalesReport:async(req,res,next)=>{
        try{
            const getSalesreport=await menuService.getSalesReport(req.params.id);
            res.status(200).json({
                message:"get id sales report",
                data:getSalesreport});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //======================================
    salesReportDate: async (req, res, next) => {
        const filter = req.body;
        try {
          const getAllsalesreport = await menuService.salesReportDate(req.body);
          res.status(200).json({
            success: true,
            data: getAllsalesreport,
          });
        } catch (error) {
          console.error(error);
          error.message = error.error;
          console.log(error);
          error.statuscode = 500;
          next(error);
        }
    },
      
    //========================================
    userRoles:async(req,res,next)=>{
        try{
            const createUserrole=await menuService.userRoles(req.body);
            res.status(200).json({
                message:"Userrole created successfully",
                data:createUserrole
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================
    getUserrole:async(req,res,next)=>{
        try{
            const getUserrole=await menuService.getUserrole(req.params.id);
            res.status(200).json({
                message:"get user role",
                data:getUserrole});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==========================================
    updateuserRoles:async(req,res,next)=>{
        try{
            const putUserRoles=await menuService.updateuserRoles(req.body);
            res.status(200).json({
                message:"updater user role",
                data:putUserRoles});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //============================================
    deleteuserRoles:async(req,res,next)=>{
        const {role_id}=req.body;
        try{
            const removeUserrole=await menuService.deleteuserRoles(role_id);
            res.status(200).json({
                message:"delete user roles",
                data:removeUserrole});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===========================================
    getallUserrole:async(req,res,next)=>{
        try{
            const getallUserrole=await menuService.getallUserrole();
            res.status(200).json({
                message:"get all user role",
                data:getallUserrole});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===========================================
    users:async(req,res,next)=>{
        try{
            const createUser=await menuService.users(req.body);
            res.status(200).json({
                message:"User created successfully",
                data:createUser
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================
    getUser:async(req,res,next)=>{
        try{
            const getUser=await menuService.getUser(req.params.id);
            res.status(200).json({
                message:"get user",
                data:getUser});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //==========================================
    updateUser:async(req,res,next)=>{
        try{
            const putUser=await menuService.updateUser(req.body);
            res.status(200).json({
                message:"updater user",
                data:putUser});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===========================================
    deleteUser:async(req,res,next)=>{
        const {user_id}=req.body;
        try{
            const removeUser=await menuService.deleteUser(user_id);
            res.status(200).json({
                message:"delete user",
                data:removeUser});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //=========================================================
    overallUser:async (req, res, next) => {
        try {
            const { 
                username,
                password_hash,
                role,
                status
            } = req.body;
        
            const getAllUser = await menuService.overallUser(
                username,
                password_hash,
                role,
                status
            );
            res.status(200).json({
                message: "Get All User Details",
                data: getAllUser
            });
        } catch (error) {
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
    },
    //======================================
    customerFeedback:async(req,res,next)=>{
        try{
            const createFeedback=await menuService.customerFeedback(req.body);
            res.status(200).json({
                message:"Feedback successfully",
                data:createFeedback
            });
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //===================================================
    getcustomerFeedback:async(req,res,next)=>{
        try{
            const getFeedback=await menuService.getcustomerFeedback(req.params.id);
            res.status(200).json({
                message:"get feedback",
                data:getFeedback});
        }catch(error){
            error.error=error.message;
            error.statuscode=400;
            console.error(error);
            next(error);
        }
    },
    //========================================================
    getIdcustomerFeedback:async (req, res, next) => {
        try {
            const { 
                feedback_date
            } = req.body;
        
            const getAllFeedbacks = await menuService.getIdcustomerFeedback(
                feedback_date
            );
            res.status(200).json({
                message: "Get All Feedbacks",
                data: getAllFeedbacks
            });
        } catch (error) {
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
    },
}



export default menuController;