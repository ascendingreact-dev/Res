import salesService from "../service/salesService.js";


const salesController={

    ordersCretaed:async(req,res,next)=>{
        try{
            const createOrders=await salesService.ordersCretaed(req.body);
            res.status(200).json({
                mesage:"Create Order Successfully",
                data:createOrders
            });
        }catch(error){
            error.error=error.message;
            console.error(error);
            error.statuscode=400;
            next(error);
        }
      },
      //================================
      getOrder:async(req,res,next)=>{
        const Order_id=req.params.id;
        try{
          const getIdOrdersonly=await salesService.getOrder(Order_id);
          res.status(200).json({
            message:"Get order Details",
            data:getIdOrdersonly
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
      },
      //==============================
      updateOrder:async(req,res,next)=>{
        try{
          const updateOrderDetails=await salesService.updateOrder(req.body);
          res.status(200).json({
            mesage:"Update Orders Successfully",
            data:updateOrderDetails
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
      },
      //===================================
      createOrderitem:async(req,res,next)=>{
        try{
            const orderItemCreate=await salesService.createOrderitem(req.body);
            res.status(200).json({
                mesage:"Orderitem Create Successfully",
                data:orderItemCreate
            });
        }catch(error){
            error.error=error.message;
            console.error(error);
            error.statuscode=400;
            next(error);
        }
      },
      //===================================
      getOrderItems:async(req,res,next)=>{
        const Order_Item_id=req.params.id;
        try{
          const getIdOrderItem=await salesService.getOrderItems(Order_Item_id);
          res.status(200).json({
            message:"Get OrderItem Details",
            data:getIdOrderItem
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
      },
      //====================================
      updateOrderItems:async(req,res,next)=>{
        try{
          const updateOrderItem=await salesService.updateOrderItems(req.body);
          res.status(200).json({
            mesage:"Updated Successfully",
            data:updateOrderItem
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
      },
    //============================================
    createCustomer:async(req,res,next)=>{
        try{
            const customersDetails=await salesService.createCustomer(req.body);
            res.status(200).json({
                mesage:"Customers Create Successfully",
                data:customersDetails
            });
        }catch(error){
            error.error=error.message;
            console.error(error);
            error.statuscode=400;
            next(error);
        }
      },
    //==================================
    getCustomers:async(req,res,next)=>{
        const customer_id=req.params.id;
        try{
          const getIdCustomers=await salesService.getCustomers(customer_id);
          res.status(200).json({
            message:"Get Customer Details Successfully",
            data:getIdCustomers
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
    },
    //====================================
    updateCustomers:async(req,res,next)=>{
        try{
          const updateCustomersDetails=await salesService.updateCustomers(req.body);
          res.status(200).json({
            mesage:"Updated Successfully",
            data:updateCustomersDetails
          });
        }catch(error){
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
    },
    //======================================
    getAllcustomers:async (req, res, next) => {
      try {
          const { 
            org_id,
            CustomerName,
            ContactNo  
          } = req.query;
      
          const getAllCustomers = await salesService.getAllcustomers(
            org_id,
            CustomerName,
            ContactNo
          );
      
          res.status(200).json({
              message: "Get All customers Details",
              data: getAllCustomers
          });
      } catch (error) {
        error.error=error.message;
        console.error(error);
        error.statuscode=400;
        next(error);
      }
  },
  // ---------------------
   deleteCustomer: async (req, res, next) => {
    const {id:customer_id, org_id} = req.params;
    try {
        const removedCustomerData = await salesService.deleteCustomer({customer_id, org_id});

        if (!removedCustomerData) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(removedCustomerData);
    } catch (error) { 
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
},


// ===============================
onlineRegister: async (req, res, next) => {
  try {
    const onlineRegister = await salesService.onlineRegister(req.body);
    res.status(200).json({
      onlineRegister,
      message: "craete online register"
    });
  } catch (error) {
    error.error = error.message;
    console.error(error);
    error.statuscode = 400;
    next(error);
  }
},
// ------------------------------
createUser:async(req,res,next)=>{
  try{
    const userDetails=await salesService.createUser(req.body);
    res.status(200).json({
        mesage:"User Create Successfully",
        userDetails:userDetails,
    });
  }catch(error){
    error.error=error.message;
    console.error(error);
    error.statuscode=400;
    next(error);
  }
},
// -------------------------
updateUser:async(req,res,next)=>{
  try{
    const updateUserDetails=await salesService.updateUser(req.body);
    res.status(200).json({
      mesage:"Updated Successfully",
      data:updateUserDetails
    });
  }catch(error){
    error.error=error.message;
    console.error(error);
    error.statuscode=400;
    next(error);
  }
},
// ===============
/* deleteUserId: async (req, res, next) => {
  const {userReg_id, org_id} = req.params
  try {
      const removedUserData = await salesService.deleteUserId({userReg_id, org_id} );

      if (!removedUserData) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(removedUserData);
  } catch (error) {
    error.error=error.message;
    console.error(error);
    error.statuscode=400;
    next(error);
  }
}, */

 deleteUserId: async (req, res, next) => {
    try {
      const { org_id } = req.params;
      const { userReg_id, admin_id } = req.query;
      const removedUserData = await salesService.deleteUserId({
        admin_id,
        userReg_id,
        org_id,
      });

      if (!removedUserData) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(removedUserData);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
// ==============
getallUser:async(req, res, next)=>{
  try{
    const overallUsers = await salesService.getallUser(req.params);
    res.status(200).json(overallUsers);
  }catch(error){
    error.error=error.message;
    console.error(error);
    error.statuscode=400;
    next(error);
  }
},

//=======================================
getSingleUser:async(req, res, next)=>{
  try{
    const {org_id} = req.params
     const { admin_id, userReg_id } = req.query;
    if (!admin_id && !userReg_id) {
      return res.status(400).json({ error: "Either admin_id or userReg_id must be provided" });
    }
    const singleUser = await salesService.getSingleUser({org_id, admin_id, userReg_id});
    res.status(200).json(singleUser);
  }catch(error){
    error.error=error.message;
    console.error(error);
    error.statuscode=400;
    next(error);
  }
},
  //===========================================
  createPayments:async(req,res,next)=>{
    try{
        const payments=await salesService.createPayments(req.body);
        res.status(200).json({
            mesage:"Payment Created Successfully",
            data:payments
        });
    }catch(error){
        error.error=error.message;
        console.error(error);
        error.statuscode=400;
        next(error);
    }
  },
  //============================================
  getPayments:async(req,res,next)=>{
    const Payment_id=req.params.id;
    try{
      const getIdPayment=await salesService.getPayments(Payment_id);
      res.status(200).json({
        message:"Get Payment Details ",
        data:getIdPayment
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //====================================
  createReceipts:async(req,res,next)=>{
    try{
        const receiptsCreate=await salesService.createReceipts(req.body);
        res.status(200).json({
            mesage:"Receipts Create Successfully",
            data:receiptsCreate
        });
    }catch(error){
        error.error=error.message;
        console.error(error);
        error.statuscode=400;
        next(error);
    }
  },
  //============================================
  getReceipts:async(req,res,next)=>{
    const receipts_id=req.params.id;
    try{
      const getIdReceipts=await salesService.getReceipts(receipts_id);
      res.status(200).json({
        message:"Get Receipts Details",
        data:getIdReceipts
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=============================================
  salesReportsCreate:async(req,res,next)=>{
    try{
        const salesReport=await salesService.salesReportsCreate(req.body);
        res.status(200).json({
            mesage:"SalesReports Create Successfully",
            data:salesReport
        });
    }catch(error){
        error.error=error.message;
        console.error(error);
        error.statuscode=400;
        next(error);
    }
  },
  //===========================================
  getSalesReport:async(req,res,next)=>{
    const salesReport_id=req.params.id;
    try{
      const getIdSalesreport=await salesService.getSalesReport(salesReport_id);
      res.status(200).json({
        message:"Get Salesreport Details",
        data:getIdSalesreport
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=====================================
  loyaltyProgramsCreate:async(req,res,next)=>{
    try{
        const loyaltyPrograms=await salesService.loyaltyProgramsCreate(req.body);
        res.status(200).json({
            mesage:"loyaltyPrograms Create Successfully",
            data:loyaltyPrograms
        });
    }catch(error){
        error.error=error.message;
        console.error(error);
        error.statuscode=400;
        next(error);
    }
  },
  //=====================================
  getIdLoyaltyPrograms:async(req,res,next)=>{
    const Loyalty_program_id=req.params.id;
    try{
      const getIdLoyalty=await salesService.getIdLoyaltyPrograms(Loyalty_program_id);
      res.status(200).json({
        message:"Get LoyaltyPrograms Details",
        data:getIdLoyalty
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=========================================
  allOrdersFilter:async (req, res, next) => {
    try {
        const { 
          order_date,
          order_status
        } = req.body;
    
        const getAllOrderFilter = await salesService.allOrdersFilter(
          order_date,
          order_status
        );
        res.status(200).json({
            message: "Get All Order Filter Details",
            data: getAllOrderFilter
        });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
},
  //==================================================
    getallitems: async (req, res, next) => {
        try {
            const { 
              order_item_id,
              order_id,
              product_id,
              quantity,
              price 
            } = req.body;
        
            const getAllOrderItem = await salesService.getallitems(
              order_item_id,
              order_id,
              product_id,
              quantity,
              price
            );
        
            res.status(200).json({
                message: "Get All Order Details",
                data: getAllOrderItem
            });
        } catch (error) {
          error.error=error.message;
          console.error(error);
          error.statuscode=400;
          next(error);
        }
    },
    //=======================================
  //   getAllcustomers:async (req, res, next) => {
  //     try {
  //         const { 
  //           name,
  //           email,
  //           phone_number,
  //           loyalty_points
  //         } = req.body;
      
  //         const getAllCustomers = await salesService.getAllcustomers(
  //           name,
  //           email,
  //           phone_number,
  //           loyalty_points
  //         );
      
  //         res.status(200).json({
  //             message: "Get All customers Details",
  //             data: getAllCustomers
  //         });
  //     } catch (error) {
  //       error.error=error.message;
  //       console.error(error);
  //       error.statuscode=400;
  //       next(error);
  //     }
  // },
  //====================================
  getallPayment:async (req, res, next) => {
    try {
        const { 
          payment_status,
          payment_date
        } = req.body;
    
        const getallPayment = await salesService.getallPayment(
          payment_status,
          payment_date
        );
        res.status(200).json({
            message: "Get All payment Details",
            data: getallPayment
        });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //==============================================
  getAllReceipts:async (req, res, next) => {
    try {
        const { 
          order_id,
          receipt_type,
          receipt_date,
          receipt_data
        } = req.body;
    
        const getallReceipts = await salesService.getAllReceipts(
          order_id,
          receipt_type,
          receipt_date,
          receipt_data
        );
        res.status(200).json({
            message: "Get All receipts Details",
            data: getallReceipts
        });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //==========================================
  getallSalesreport:async (req, res, next) => {
    try {
        const { 
          report_date
        } = req.body;
    
        const getReportDate = await salesService.getallSalesreport(
          report_date
        );
        res.status(200).json({
            message: "Get All report Details",
            data: getReportDate
        });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //======================================
  getAllLoyaltyProgram:async (req, res, next) => {
    try {
        const { 
          customer_id,
          reward_points,
          last_updated
        } = req.body;
    
        const getAllLoyaltyPrograms = await salesService.getAllLoyaltyProgram(
          customer_id,
          reward_points,
          last_updated
        );
        res.status(200).json({
            message: "Get All Loyalty Details",
            data: getAllLoyaltyPrograms
        });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //===========================================
  schedules:async(req,res,next)=>{
    try{
      const schedulesCreate=await salesService.schedules(req.body);
      res.status(200).json({
          mesage:"schedule Create Successfully",
          data:schedulesCreate
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //===========================================
  getSchedules:async(req,res,next)=>{
    try{
      const getSchedulesId = await salesService.getSchedules(req.params.id);
      res.status(200).json({
        data:getSchedulesId,
        message:"get Schedules"
      });
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=========================================
  updateSchedules:async(req,res,next)=>{
    try{
      const changeSchedules = await salesService.updateSchedules(req.body);
      res.status(200).json({changeSchedules,message:"update sucessfully"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=============================================
  getEmployee:async(req,res,next)=>{
    const {
      employee_id,
      timestamp
    } = req.body;
    try{
      const changeSchedules = await salesService.getEmployee(employee_id,timestamp);
      res.status(200).json({changeSchedules,message:"get employee"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=========================================
  TimeOffRequests:async(req,res,next)=>{
    try{
      const createTime = await salesService.TimeOffRequests(req.body);
      res.status(200).json({createTime,message:"Create Time Request"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=========================================
  getTimeOffRequests:async(req,res,next)=>{
    try{
      const getTime = await salesService.getTimeOffRequests(req.params.id);
      res.status(200).json({getTime,message:"get Time Request"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //============================================
  updateTimeOffRequests:async(req,res,next)=>{
    try{
      const updateTimeRequest = await salesService.updateTimeOffRequests(req.body);
      res.status(200).json({updateTimeRequest,message:"update sucessfully"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //=========================================
  filterTimeOffRequests:async(req,res,next)=>{
    const {
      employee_id,
      status
    } = req.body;
    try{
      const getFilterTimeReq = await salesService.filterTimeOffRequests(employee_id,status);
      res.status(200).json({getFilterTimeReq,message:"get employee"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //===============================================
  Tasks:async(req,res,next)=>{
    try{
      const createTasks = await salesService.Tasks(req.body);
      res.status(200).json({createTasks,message:"Create Task Request"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //============================================
  getTask:async(req,res,next)=>{
    try{
      const getTaskId = await salesService.getTask(req.params.id);
      res.status(200).json({getTaskId,message:"get Task"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //================================================
  updateTask:async(req,res,next)=>{
    try{
      const updateTask = await salesService.updateTask(req.body);
      res.status(200).json({updateTask,message:"Update Task"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
  //====================================================
  filterTask:async(req,res,next)=>{
    const {
      employee_id,
      status
    } = req.body;
    try{
      const getFilterTask = await salesService.filterTask(employee_id,status);
      res.status(200).json({getFilterTask,message:"get Task"});
    }catch(error){
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },
}



export default salesController;