import organizationModel from "../model/organizationModel.js";
import registerModel from "../model/registerModel.js";
import userModel from "../model/userModel.js";
import tableService from "../service/tableService.js";

const tableController = {
  //new

  getWaiterTables: async (req, res, next) => {
    try {
     const {  EmailId, org_id } = req.params;

    const tables = await tableService.getWaiterTables({ EmailId, org_id });

    if (!tables) {
      return res.status(404).json({ message: "Waiter not found in the given organization" });
    }

    return res.status(200).json({
      message: "Allocated tables fetched successfully",
      Tables: tables,
    });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  //==============================================================================
  reservations: async (req, res, next) => {
    try {
      const createReservations = await tableService.reservations(req.body);
      res.status(200).json({
        mesage: "Create reservations Successfully",
        data: createReservations,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================
  getReservations: async (req, res, next) => {
    const reservation_id = req.params.id;
    try {
      const reservationsId = await tableService.getReservations(reservation_id);
      res.status(200).json({
        message: "Get reservations Details",
        data: reservationsId,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=======================================
  updateReservations: async (req, res, next) => {
    try {
      const reservationUpdate = await tableService.updateReservations(req.body);
      res.status(200).json({
        mesage: "Update reservations Successfully",
        data: reservationUpdate,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===================================
  deleteReservations: async (req, res, next) => {
    const reservation_id = req.params.id;
    try {
      const deleteDetails = await tableService.deleteReservations(
        reservation_id
      );
      res.status(200).json({
        message: "deleted successfully",
        data: deleteDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================================
  overallReservations: async (req, res, next) => {
    try {
      const getOverallDetails = await tableService.overallReservations();
      res.status(200).json({
        message: "Get Reservations Details",
        data: getOverallDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================================
  tableAssignments: async (req, res, next) => {
    try {
      const createtableAssignments = await tableService.tableAssignments(
        req.body
      );
      res.status(200).json({
        mesage: "Create tableAssignments Successfully",
        data: createtableAssignments,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================
  getTableAssignments: async (req, res, next) => {
    const assignment_id = req.params.id;
    try {
      const tableAssignmentId = await tableService.getTableAssignments(
        assignment_id
      );
      res.status(200).json({
        message: "Get tableAssignments Details",
        data: tableAssignmentId,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==================================
  updateTableAssignments: async (req, res, next) => {
    try {
      const updateDetails = await tableService.updateTableAssignments(req.body);
      res.status(200).json({
        mesage: "update TableAssignments Successfully",
        data: updateDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=========================================
  getallTablesAssignments: async (req, res, next) => {
    try {
      const getOverallDetails = await tableService.getallTablesAssignments();
      res.status(200).json({
        message: "Getall TablesAssignments  Details",
        data: getOverallDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=====================================
  tableTurnover: async (req, res, next) => {
    try {
      const createtableTurnover = await tableService.tableTurnover(req.body);
      res.status(200).json({
        mesage: "Create createtableTurnover Successfully",
        data: createtableTurnover,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=====================================
  getTableTurnover: async (req, res, next) => {
    const turnover_id = req.params.id;
    try {
      const tableTurnoverId = await tableService.getTableTurnover(turnover_id);
      res.status(200).json({
        message: "Get tableTurnover Details",
        data: tableTurnoverId,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getAlltableTurnover: async (req, res, next) => {
    try {
      const getOverallTurnover = await tableService.getAlltableTurnover();
      res.status(200).json({
        message: "Getall Turnover Details",
        data: getOverallTurnover,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  waitingList: async (req, res, next) => {
    try {
      const createwaitingList = await tableService.waitingList(req.body);
      res.status(200).json({
        mesage: "Create createwaitingList Successfully",
        data: createwaitingList,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //===============================================
  getWaitingList: async (req, res, next) => {
    const turnover_id = req.params.id;
    try {
      const idWaitingList = await tableService.getWaitingList(turnover_id);
      res.status(200).json({
        message: "Get WaitingList Details",
        data: idWaitingList,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=====================================
  updateWaitingList: async (req, res, next) => {
    try {
      const updateDetails = await tableService.updateWaitingList(req.body);
      res.status(200).json({
        mesage: "update WaitingList Successfully",
        data: updateDetails,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //========================================
  getAllwaitingList: async (req, res, next) => {
    try {
      const getoverallList = await tableService.getAllwaitingList();
      res.status(200).json({
        message: "Getall waiting list ",
        data: getoverallList,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //====================================
  users: async (req, res, next) => {
    try {
      const createUser = await tableService.users(req.body);
      res.status(200).json({
        mesage: "Create Users",
        data: createUser,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=======================================
  getUsers: async (req, res, next) => {
    const customer_id = req.params.id;
    try {
      const idGetUsers = await tableService.getUsers(customer_id);
      res.status(200).json({
        message: "Get WaitingList Details",
        data: idGetUsers,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================================
  auditTrails: async (req, res, next) => {
    try {
      const tableAssignments = await tableService.auditTrails();
      const reservations = await tableService.auditTrails();
      const result = {
        tableAssignments,
        reservations,
      };
      res.status(200).json({
        message: "Table Assignments , Reservations",
        data: result,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //==========================================
  tables: async (req, res, next) => {
    try {
      const tablecreate = await tableService.tables(req.body);
      res.status(200).json({
        message: "table created successfully",
        data: tablecreate,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //============================================
  getTables: async (req, res, next) => {
    const table_id = req.params.id;
    try {
      const idTables = await tableService.getTables(table_id);
      res.status(200).json({
        message: "Get WaitingList Details",
        data: idTables,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //=============================================
  updateTables: async (req, res, next) => {
    try {
      const updateTables = await tableService.updateTables(req.body);
      res.status(200).json({
        mesage: "update WaitingList Successfully",
        data: updateTables,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //====================================================
  userOrder: async (req, res, next) => {
    try {
      const createUserOrder = await tableService.userOrder(req.body);
      res.status(200).json({
        message: "User order created successfully",
        data: createUserOrder,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getAllOrder: async (req, res, next) => {
    try {
      const userOrders = await tableService.getAllOrder(req.params);
      res.status(200).json({
        message: "all user Order",
        data: userOrders,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  deleteUserOrder: async (req, res, next) => {
    try {
      const userOrder = await tableService.deleteUserOrder(req.body);
      res.status(200).json({
        message: "deleted user Order",
        data: userOrder,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ==========
  checkUserOrder: async (req, res, next) => {
    try {
      const checkUserOrder = await tableService.checkUserOrder(req.body);
      res.status(200).json({
        message: " successfully",
        data: checkUserOrder,
      });
    } catch (error) {
      console.error(error);
      error.statusCode = 400;
      next(error);
    }
  },
  //===========================================
  updateStatus: async (req, res, next) => {
    try {
      // Log the incoming request body
      // console.log(req.body);

      const updateDetails = await tableService.updateStatus(req.body);
      res.status(200).json(updateDetails);
    } catch (error) {
      console.error(error);
      error.error = error.message;
      error.statuscode = 400;
      next(error);
    }
  },

  //=============================================
  getUserorder: async (req, res, next) => {
    try {
      const userOrder = await tableService.getUserorder(req.body);
      res.status(200).json({
        message: "Get User Order Details",
        data: userOrder,
      });
    } catch (error) {
      console.error(error);
      next({
        statusCode: 400,
        message: error.message,
      });
    }
  },
  //==========================================
  removeDishbyTableId: async (req, res, next) => {
    const { id, table_id, admin_id, org_id } = req.body;

    try {
      const removeDish = await tableService.removeDishbyTableId(req.body);
      res.status(200).json({
        message: "Deleted successfully",
        data: removeDish,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message || "An error occurred",
      });
      next(error);
    }
  },
  //================================================================

  getuserorderTable: async (req, res, next) => {
    try {
      const table_id = req.params.table_id; // Extract table_id from params
      const userOrder = await tableService.getuserorderTable(table_id); // Pass table_id to the service

      // Return only the table_id in the response
      res.status(200).json({
        message: "Get User Order Details",
        data: {
          table_id: userOrder,
        },
      });
    } catch (error) {
      console.error(error);
      next({
        statusCode: 400,
        message: error.message,
      });
    }
  },
  //==========================================================
  updateQuantity: async (req, res, next) => {
    try {
      const updatequantityOnly = await tableService.updateQuantity(req.body);
      res.status(200).json(updatequantityOnly);
    } catch (error) {
      console.error(error);
      error.error = error.message;
      error.statuscode = 400;
      next(error);
    }
  },
  //==================================================
  getallUser: async (req, res, next) => {
    try {
      const getallUsers = await tableService.getallUser(req.body);
      res.status(200).json(getallUsers);
    } catch (error) {
      console.error(error);
      error.error = error.message;
      error.statuscode = 400;
      next(error);
    }
  },
};

export default tableController;
