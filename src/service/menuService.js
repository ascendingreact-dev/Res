import menuitemModel from "../model/menuItemModel.js";
import CategoryModel from "../model/CategoryModel.js";
import specialOffersModel from "../model/specialOffersModel.js";
import comboDealsModel from "../model/comboDealsModel.js";
import ComboItemModel from "../model/ComboItemModel.js";
import reportSalesModel from "../model/reportSalesModel.js";
import userRoleModel from "../model/userRoleModel.js";
import usersModel from "../model/userRegModel.js";
import feedbackModel from "../model/feedbackModel.js";
const menuService={
    menuItems:async(data)=>{
        const {
            admin_id,
            org_id,
            menuName,
            description,
            price,
            category_id,
            menuImg,
            allergen_info,
            dietary_info,
            status,
            Caregory,
            Barcode,
            CaregoryIcon
        }=data;
        try{
            const createMenuItems=await menuitemModel.create({
            admin_id,
            org_id,
            menuName,
            description,
            price,
            category_id,
            menuImg,
            allergen_info,
            dietary_info,
            status,
            Caregory,
            Barcode,
            status:"Active",
            CaregoryIcon
            });
            return createMenuItems;
        }catch(error){
            throw new error;
        }
    },
    //====================================
    getmenuItem:async(menu_item_id, admin_id,org_id,)=>{
        try{
            const getIdonly=await menuitemModel.findById(menu_item_id);
            return getIdonly;
        }catch(error){
            throw new error;
        }
    },
    //========================================
    updateMenuitem:async(data)=>{
        const { 
            admin_id,
            org_id,
            menu_item_id,
            item_name,
            description,
            price,
            category_id,
            image_url,
            allergen_info,
            dietary_info,
            status
        }=data;
        try{
            const updateMenuItems=await menuitemModel.findByIdAndUpdate(menu_item_id,{
            item_name,
            description,
            price,
            category_id,
            image_url,
            allergen_info,
            dietary_info,
            status},
            {
                new:true
            }
            );
            return updateMenuItems;
        }catch(error){
            throw new error;
        }
    },
    //====================================
    deleteMenuitem:async(data)=>{
        const {menu_item_id, admin_id,org_id}=data;
        try{
            const deleteIdOnly=await menuitemModel.findByIdAndDelete(menu_item_id);
            return deleteIdOnly;
        }catch(error){
            throw new error;
        }
    },
    //=======================================
    categoryStatus:async( admin_id,org_id,category_id,status)=>{
        try{
            const filter={};
            if(category_id){
                filter.category_id=category_id;
                console.log('category Id is',filter.category_id);
            }
            if(status){
                filter.status=status;
                console.log('status :',filter.status);
            }
            const categoryStatus=await menuitemModel.find(filter);
            console.log(categoryStatus);
            return categoryStatus;
        }catch(error){
            throw new error;
        }
    },
    //=======================================================
    categories:async(data)=>{
        const {
            admin_id,
            org_id,
            category_name,
            category_description
        }=data;
        try{
            const createMenuItems=await CategoryModel.create({
                admin_id,
                org_id,
                category_name,
                category_description
            });
            return createMenuItems;
        }catch(error){
            throw new error;
        }
    },
    //============================================
    getCategorie:async(category_id, admin_id,org_id)=>{
        try{
            const getIdonly=await CategoryModel.findById(category_id);
            return getIdonly;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    updateCategories:async(data)=>{
        const {
            admin_id,
            org_id,
            category_id,
            category_name,
            category_description
        }=data;
        try{
            const updateCategories=await CategoryModel.findByIdAndUpdate(category_id,{
                category_name,
                category_description
            },
            {
                new:true
            }
            );
            return updateCategories;
        }catch(error){
            throw new error;
        }
    },
    //=============================================
    deleteCategories:async(data)=>{
        const  {admin_id,org_id,menu_item_id}=data;
        try{
            const deleteIdOnly=await CategoryModel.findByIdAndDelete(menu_item_id);
            return deleteIdOnly;
        }catch(error){
            throw new error;
        }
    },
    //============================================
    gelallCategories:async()=>{
        try{
            const getOverall=await CategoryModel.find();
            return getOverall;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    specialOffers:async(data)=>{
        const {
            admin_id,
            org_id,
            offer_name,
            offer_description,
            discount_percentage,
            start_date,
            end_date,
            status
        }=data;
        try{
            const createOffers=await specialOffersModel.create({
            admin_id,
            org_id,
            offer_name,
            offer_description,
            discount_percentage,
            start_date,
            end_date,
            status
            });
            return createOffers;
        }catch(error){
            throw new error;
        }
    },
    //===========================================
    getSpecialOffers:async(offer_id, admin_id,org_id)=>{
        try{
            const getIdonly=await specialOffersModel.findById(offer_id);
            return getIdonly;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    updateSpecialoffer:async(data)=>{
        const {
            admin_id,
            org_id,
            offer_id,
            offer_name,
            offer_description,
            discount_percentage,
            status
        }=data;
        try{
            const updateOffers=await specialOffersModel.findByIdAndUpdate(offer_id,{
            offer_name,
            offer_description,
            discount_percentage,
            status
            },
            {
                new:true
            }
            );
            return updateOffers;
        }catch(error){
            throw new error;
        }
    },
    //========================================
    removeSpecialoffers:async(data)=>{
        const  {admin_id,org_id,offer_id}=data;
        try{
            const deleteIdOffers=await specialOffersModel.findByIdAndDelete(offer_id);
            return deleteIdOffers;
        }catch(error){
            throw new error;
        }
    },
    //========================================
    overallOffers:async()=>{
        try{
            const overallOffers=await specialOffersModel.find();
            return overallOffers;
        }catch(error){
            throw new error;
        }
    },
    //=======================================
    comboDeals:async(data)=>{
        const {
            admin_id,
            org_id,
            combo_name,
            combo_description,
            price,
            status
        }=data;
        try{
            const createcomboDeals=await comboDealsModel.create({
                admin_id,
                org_id,
                combo_name,
                combo_description,
                price,
                status
            });
            return createcomboDeals;
        }catch(error){
            throw new error;
        }
    },
    //=============================================
    getCombodeals:async(combo_id, admin_id,org_id)=>{
        try{
            const getcomboIdonly=await comboDealsModel.findById(combo_id);
            return getcomboIdonly;
        }catch(error){
            throw new error;
        }
    },
    //========================================
    updateComboDeals:async(data)=>{
        const {
            admin_id,
            org_id,
            combo_id,
            combo_name,
            combo_description,
            price,
            status
        }=data;
        try{
            const updateCombodeals=await comboDealsModel.findByIdAndUpdate(combo_id,{
                combo_name,
                combo_description,
                price,
                status
            },
            {
                new:true
            }
            );
            return updateCombodeals;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    deleteComboDeals:async(data)=>{
        const  {admin_id,org_id,combo_id}=data;
        try{
            const deletecombo=await comboDealsModel.findByIdAndDelete(combo_id);
            return deletecombo;
        }catch(error){
            throw new error;
        }
    },
    //=============================================
    overallCombodeals:async()=>{
        try{
            const overallcombodeals=await comboDealsModel.find();
            return overallcombodeals;
        }catch(error){
            throw new error;
        }
    },
    //================================================
    menuItemCombos:async ( admin_id,org_id,combo_id, menu_item_ids) => {
        try {
            // Check if combo_id and menu_item_ids are valid
           /* if (!combo_id || !menu_item_ids || menu_item_ids.length === 0) {
                throw new Error('Invalid combo ID or menu item IDs');
            }*/
    
            // Create entries in the ComboItemCombos table
            const promises = menu_item_ids.map(item_id => {
                return ComboItemModel.create({
                    combo_id,
                    menu_item_id: item_id
                });
            });
    
            const result = await Promise.all(promises);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    //============================================
    getMenuItemCombos: async( admin_id,org_id,combo_item_id)=>{
        try{
            const getcomboIdonly=await ComboItemModel.findById(combo_item_id);
            return getcomboIdonly;
        }catch(error){
            throw new error;
        }
    },
    //=================================================
    removeMenuItemCombos:async(data)=>{
        const  {admin_id,org_id,combo_item_id}=data;
        try{
            const deletecomboItems=await ComboItemModel.findByIdAndDelete(combo_item_id);
            return deletecomboItems;
        }catch(error){
            throw new error;
        }
    },
    //================================================
    getallmenuItemCombos:async()=>{
        try{
            const overallmenuItems=await ComboItemModel.find();
            return overallmenuItems;
        }catch(error){
            throw new error;
        }
    },
    //=================================================
    salesReports:async(data)=>{
        const {
            admin_id,
            org_id,
            report_date,
            total_sales,
            best_selling_items,
            underperforming_items,
            report_data
        }=data;
        try{
            const createSales=await reportSalesModel.create({
            admin_id,
            org_id,
            report_date,
            total_sales,
            best_selling_items,
            underperforming_items,
            report_data
            });
            return createSales;
        }catch(error){
            throw new error;
        }
    },
    //=======================================
    getSalesReport:async(report_id,admin_id,org_id)=>{
        try{
            const getsalesIdonly=await reportSalesModel.findById(report_id);
            return getsalesIdonly;
        }catch(error){
            throw new error;
        }
    },
    //=========================================
    salesReportDate:async (data) => {
        const {
            admin_id,
            org_id,
            startDate,
            endDate,            
        } = data;
        try {
            const filter = {};
            if (startDate && endDate) {
                filter.report_date = {
                    $gte: new Date(startDate),
                    $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)) // End of the range (full day)
                };
            }
            // If only startDate is provided, fetch data exactly matching that date (ignoring time)
            else if (startDate) {
                const start = new Date(startDate);
                const end = new Date(startDate);
                end.setUTCHours(23, 59, 59, 999); // End of the day

                filter.report_date = {
                    $gte: start, 
                    $lte: end 
                };
            }
            console.log('Filter:', filter); 
            const getAllsalesreportDate = await reportSalesModel.find(filter);
            return getAllsalesreportDate;
        } catch (error) {
            throw error;
        }
    },
    //==============================================
    userRoles:async(data)=>{
        const {
            admin_id,org_id,role_name,permissions
        }=data;
        try{
            const createUserrole=await userRoleModel.create({
                role_name,permissions
            });
            return createUserrole;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    getUserrole:async(admin_id,org_id,role_id)=>{
        try{
            const getUserroleid=await userRoleModel.findById(role_id);
            return getUserroleid;
        }catch(error){
            throw new error;
        }
    },
    //==============================================
    updateuserRoles:async(data)=>{
        const {admin_id,org_id,role_id,role_name,permissions
        }=data;
        try{
            const updateCombodeals=await userRoleModel.findByIdAndUpdate(role_id,{
                role_name,permissions
            },
            {
                new:true
            }
            );
            return updateCombodeals;
        }catch(error){
            throw new error;
        }
    },
    //=============================================
    deleteuserRoles:async(data)=>{
        const {admin_id,org_id,role_id}=data;
        try{
            const deleteUserRole=await userRoleModel.findByIdAndDelete(role_id);
            return deleteUserRole;
        }catch(error){
            throw new error;
        }
    },
    //=================================================
    getallUserrole:async()=>{
        try{
            const overallUserrole=await userRoleModel.find();
            return overallUserrole;
        }catch(error){
            throw new error;
        }
    },
    //==================================
    users:async(data)=>{
        const {
            admin_id,
            org_id,
            username,
            password_hash,
            role,
            status 
        }=data;
        try{
            const createUserrole=await usersModel.create({
            admin_id,
            org_id,
            username,
            password_hash,
            role,
            status
            });
            return createUserrole;
        }catch(error){
            throw new error;
        }
    },
    //=====================================
    getUser:async(admin_id,org_id,user_id)=>{
        try{
            const getUserId=await usersModel.findById(user_id);
            return getUserId;
        }catch(error){
            throw new error;
        }
    },
    //==========================================
    updateUser:async(data)=>{
        const {
            admin_id,
            org_id,
            user_id,
            username,
            password_hash,
            role,
            status
        }=data;
        try{
            const updateUser=await usersModel.findByIdAndUpdate(user_id,{
            username,
            password_hash,
            role,
            status
            },
            {
                new:true
            }
            );
            return updateUser;
        }catch(error){
            throw new error;
        }
    },
    //======================================
    deleteUser:async(data)=>{
        const {admin_id,org_id,user_id}=data;
        try{
            const deleteUser=await usersModel.findByIdAndDelete(user_id);
            return deleteUser;
        }catch(error){
            throw new error;
        }
    },
    //=====================================
    overallUser:async (
        admin_id,
        org_id,
        username,
        password_hash,
        role,
        status
    ) => {
        try {
            const filter = {};
            
            if (username) {
                filter.username = username;
                console.log('Fetching by Username:', filter.username);
            } 
            if (password_hash) {
                filter.password_hash = password_hash;
                console.log('Fetching by password_hash:', filter.password_hash);
            }
            if (role) {
                filter.role = role;
                console.log('Fetching by last_updated:', filter.role);
            } 
            if (status) {
                filter.status = status;
                console.log('Fetching by role:', filter.status);
            }
            
            if (Object.keys(filter).length === 0) {
                throw new Error('No valid filter criteria provided');
            }
            
            const results = await usersModel.find(filter);
            console.log(results);
            return results;
    
        } catch (error) {
            throw new Error('Error fetching loyalty programs: ' + error.message);
        }
    },
    //========================================
    customerFeedback:async(data)=>{
        const {
            admin_id,
            org_id,
            menu_item_id,
            customer_name,
            rating,
            comments,
            feedback_date
        }=data;
        try{
            const createFeedback=await feedbackModel.create({
                admin_id,
                org_id,
                menu_item_id,
                customer_name,
                rating,
                comments,
                feedback_date
            });
            return createFeedback;
        }catch(error){
            throw new error;
        }
    },
    //=============================================================
    getcustomerFeedback:async(admin_id,org_id,feedback_id)=>{
        try{
            const getUserId=await feedbackModel.findById(feedback_id);
            return getUserId;
        }catch(error){
            throw new error;
        }
    },
    //===============================================
    getIdcustomerFeedback:async (
        admin_id,org_id,feedback_date
    ) => {
        try {
            const filter = {};
            
            if (feedback_date) {
                filter.feedback_date = feedback_date;
            } 
            
            if (Object.keys(filter).length === 0) {
                throw new Error('No valid filter criteria provided');
            }
            
            const feedbackId = await feedbackModel.find(filter);
            console.log(feedbackId);
            return feedbackId;
    
        } catch (error) {
            throw new Error('Error fetching loyalty programs: ' + error.message);
        }
    },
    
}




export default menuService;