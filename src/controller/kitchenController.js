import kitchenService from "../service/kitchenService.js";

const kitchenController = {
  getMenuitem: async (req, res, next) => {
    try {
      const io = req.app.get("socketio");

      if (!io) {
        throw new Error("Socket.IO instance not found");
      }

      const { Category, menuName } = req.body;
      console.log(req.body, "jjh");
      const OverAllnameCategory = await kitchenService.getMenuitem(
        Category,
        menuName,
        io
      );
      res.status(200).json({
        data: OverAllnameCategory,
      });
    } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================

  getoverallDate: async (req, res, next) => {
    try {
      const getallDate = await kitchenService.getoverallDate(req.body);
      res.status(200).json(getallDate);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //=============================================
  removeOverallId: async (req, res, next) => {
    const { _id } = req.body;
    if (!Array.isArray(_id) || _id.length === 0) {
      return res
        .status(400)
        .json({
          message: "Invalid input: kitchen_ids must be a non-empty array.",
        });
    }

    try {
      const deleteResult = await kitchenService.removeOverallId(_id);
      res.status(200).json({
        message: "Deleted kitchen IDs successfully",
        deletedCount: deleteResult.deletedCount,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=========================================================

  //==================================================
  // getproductNameCategory:async (req, res, next) => {
  //     try {
  //         const {
  //             ProductCatagory,
  //             ProductName
  //         } = req.body;

  //         const getOverallProduct = await kitchenService.getproductNameCategory(
  //             ProductCatagory,
  //             ProductName
  //         );
  //         res.status(200).json({
  //             message: "Get table name",
  //             data: getOverallProduct
  //         });
  //     } catch (error) {
  //       error.error=error.message;
  //       console.error(error);
  //       error.statuscode=400;
  //       next(error);
  //     }
  // },
  //====================================================
  /* getallUserOrder:async(req, res, next)=>{
        try{
            const getallDetails = await kitchenService.getallUserOrder();
            res.status(200).json(getallDetails);
        }catch(error){
            error.error = error.message;
            error.statuscode = 400;
            console.error(error);
            next(error);  
        }
    },*/
  //============================================
  updateUserOrder: async (req, res, next) => {
    try {
      const updateIdUserOrder = await kitchenService.updateUserOrder(req.body);
      res.status(200).json(updateIdUserOrder);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // -------------------
  updateStatusKds: async (req, res, next) => {
    try {
      // const io = req.app.get('socketio');

      // if (!io) {
      //   throw new Error("Socket.IO instance not found");
      // }
      const updateStatusKds = await kitchenService.updateStatusKds(req.body);
      res.status(200).json(updateStatusKds);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  // --------------
  getUserOrderHistory: async (req, res, next) => {
    try {
      // const io = req.app.get('socketio');

      // if (!io) {
      //   throw new Error("Socket.IO instance not found");
      // }
      const getUserOrderHistory = await kitchenService.getUserOrderHistory(
        req.params
      );
      res.status(200).json(getUserOrderHistory);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //================================================
  getTotalOrder: async (req, res, next) => {
    try {
      // const io = req.app.get('socketio');

      // if (!io) {
      //   throw new Error("Socket.IO instance not found");
      // }
      const userallTableTotal = await kitchenService.getTotalOrder(req.params);
      res.status(200).json(userallTableTotal);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==============================================

  getAllUserOrder: async (req, res, next) => {
    try {
      //     const io = req.app.get('socketio');

      // if (!io) {
      //   throw new Error("Socket.IO instance not found");
      // }
      const getOveralluserOrder = await kitchenService.getAllUserOrder(
        req.params
      ); // No socket passed
      res.status(200).json(getOveralluserOrder);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //============================================
  updateMenuName: async (req, res, next) => {
    try {
      const updateDetails = await kitchenService.updateMenuName(req.body);
      res.status(200).json(updateDetails);
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //====================================================
  getTablenameType: async (req, res, next) => {
    try {
      const getOverallProduct = await kitchenService.getTablenameType(req.body);
      res.status(200).json({
        message: "Get table name",
        data: getOverallProduct,
      });
    } catch (error) {
       error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==============================================
};

export default kitchenController;
