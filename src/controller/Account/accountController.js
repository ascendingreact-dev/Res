// import accountService from "../../service/Account/accountService.js"

// const accountController = {
//     async saveBill(req, res) {
//         try {
//             const accountData = req.body;
//             const newAccount = await accountService.saveBillService(accountData);
//             res.status(201).json({
//                 message: "Account created successfully",
//                 data: newAccount,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: `Failed to create account: ${error.message}`,
//             });
//         }
//     },

//     async getAllsavedBills(req, res) {
//         try {
//             const accounts = await accountService.getAllsavedBillsService();
//             res.status(200).json(accounts);
//         } catch (error) {
//             res.status(500).json({
//                 message: `Failed to fetch accounts: ${error.message}`,
//             });
//         }
//     },
//     async getAllsavedBillsBymonth(req, res) {
//         const {
//             month,
//             year
//         } = req.query;
//         if (!month || !year) {
//             return res.status(400).json({
//                 message: "Please provide both month and year in the query parameters",
//             });
//         }
//         try {
//             const startDate = new Date(year, month - 1, 1);
//             const endDate = new Date(year, month, 0, 23, 59, 59);
//             const accounts = await accountService.getBillsByMonthService(startDate, endDate);
//             if (!accounts.length) {
//                 return res.status(404).json({
//                     message: "No bills found for the given month",
//                 });
//             }
//             res.status(200).json(accounts);
//         } catch (error) {
//             res.status(500).json({
//                 message: `Failed to fetch bills by month: ${error.message}`,
//             });
//         }
//     },

//     async deleteSavedBillById(req, res) {
//         const {
//             ids
//         } = req.body;
//         if (!ids || (Array.isArray(ids) && ids.length === 0)) {
//             return res.status(400).json({
//                 message: "At least one Bill ID is required"
//             });
//         }
//         try {
//             let deletedBills;
//             if (Array.isArray(ids)) {
//                 deletedBills = await accountService.deleteBillsByIdsService(ids);
//             } else {
//                 deletedBills = await accountService.deleteBillByIdService(ids);
//             }
//             if (!deletedBills || (Array.isArray(deletedBills) && deletedBills.length === 0)) {
//                 return res.status(404).json({
//                     message: "Bill(s) not found"
//                 });
//             }
//             res.status(200).json({
//                 message: Array.isArray(ids) ?
//                     `${deletedBills.length} bills deleted successfully` : "Bill deleted successfully",
//                 deletedBills,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: `Failed to delete bill(s): ${error.message}`
//             });
//         }
//     },

//     async getBillsByDate(req, res) {
//         try {
//             const { date } = req.query;
//             const bills = await accountService.getBillsByDateService(date);
//             return res.status(200).json(bills);
//         } catch (error) {
//             return res.status(500).json({ message: `Failed to get bills by date: ${error.message}` });
//         }
//     },

//     async getBillsByWeek(req, res) {
//         try {
//             const { startDate } = req.query;
//             const bills = await accountService.getBillsByWeekService(startDate);
//             return res.status(200).json(bills);
//         } catch (error) {
//             return res.status(500).json({ message: `Failed to get bills by week: ${error.message}` });
//         }
//     }

// }

// export default accountController;

import accountService from "../../service/Account/accountService.js";

const accountController = {

  getCusName: async(req, res, next)=>{
    try {
      const cusName = await accountService.getCusName(req.params)
      res.status(201).json({
        message: "name get success",
        data: cusName,
      });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  }, 
  async saveBill(req, res, next) {
    try {
      const accountData = req.body;
      const newAccount = await accountService.saveBillService(accountData);
      res.status(201).json({
        message: "Account created successfully",
        data: newAccount,
      });
    } catch (error) {
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },

  getBillsByDate: async (req, res, next) => {
    try {
      const bills = await accountService.getBillsByDateService(req.params);
      console.log(bills);

      return res.status(200).json(bills);
    } catch (error) {
      // return res.status(500).json({ message: `Failed to get bills by date: ${error.message}` });
      error.error=error.message;
      console.error(error);
      error.statuscode=400;
      next(error);
    }
  },

  async getAllsavedBills(req, res) {
    try {
      const accounts = await accountService.getAllsavedBillsService();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({
        message: ` Failed to fetch accounts: ${error.message}`,
      });
    }
  },

  getAllsavedBillsBymonth: async (req, res, next) => {
    try {
      const { org_id, date } = req.body;

      if (!org_id || !date) {
        return res.status(400).json({
          error: "Date is required in the request body.",
        });
      }

      let startDate, endDate;
      const currentYear = new Date().getFullYear();

      const monthMap = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
      };

      const lowerDate = date.toLowerCase();

      if (monthMap.hasOwnProperty(lowerDate)) {
        const month = monthMap[lowerDate];
        startDate = new Date(currentYear, month, 1);
        endDate = new Date(currentYear, month + 1, 0, 23, 59, 59, 999);
      } else if (/^\d{4}-\d{2}$/.test(date)) {
        const [year, month] = date.split("-");
        const yearToUse = year ? parseInt(year, 10) : currentYear;
        const monthToUse = parseInt(month, 10) - 1;

        if (monthToUse < 0 || monthToUse > 11) {
          return res.status(400).json({
            error:
              "Invalid month. Please provide a valid month between 01 and 12.",
          });
        }

        startDate = new Date(yearToUse, monthToUse, 1);
        endDate = new Date(yearToUse, monthToUse + 1, 0, 23, 59, 59, 999);
      } else if (/^\d{4}$/.test(date)) {
        const year = parseInt(date, 10);
        startDate = new Date(year, 0, 1);
        endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      } else {
        return res.status(400).json({
          error: "Invalid date format. Please use 'dec', 'YYYY-MM', or 'YYYY'.",
        });
      }

      const bills = await accountService.getAllsavedBillsBymonth(
        org_id,
        startDate,
        endDate
      );
      res.status(200).json(bills);
    } catch (error) {
      console.error(`Error in getAllsavedBillsBymonth: ${error.message}`);
      next({
        statusCode: 400,
        message: `Unable to fetch bills: ${error.message}`,
      });
    }
  },

  async deleteSavedBillById(req, res) {
    const { ids } = req.body;
    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return res.status(400).json({
        message: "At least one Bill ID is required",
      });
    }
    try {
      let deletedBills;
      if (Array.isArray(ids)) {
        deletedBills = await accountService.deleteBillsByIdsService(ids);
      } else {
        deletedBills = await accountService.deleteBillByIdService(ids);
      }
      if (
        !deletedBills ||
        (Array.isArray(deletedBills) && deletedBills.length === 0)
      ) {
        return res.status(404).json({
          message: "Bill(s) not found",
        });
      }
      res.status(200).json({
        message: `Array.isArray(ids) ?
                    ${deletedBills.length} bills deleted successfully : "Bill deleted successfully"`,
        deletedBills,
      });
    } catch (error) {
      res.status(500).json({
        message: `Failed to delete bill(s): ${error.message}`,
      });
    }
  },

  // async getBillsByDate(req, res) {
  //     const {
  //         date
  //     } = req.body;

  //     if (!date) {
  //         return res.status(400).json({
  //             message: "Please provide a date in the format DD/MM/YYYY in the request body",
  //         });
  //     }

  //     const [day, month, year] = date.split('/').map(Number);

  //     if (!day || !month || !year) {
  //         return res.status(400).json({
  //             message: "Invalid date format. Please provide a valid date in the format DD/MM/YYYY",
  //         });
  //     }

  //     try {
  //         const startDate = new Date(year, month - 1, day, 0, 0, 0); // Start of the day
  //         const endDate = new Date(year, month - 1, day, 23, 59, 59); // End of the day

  //         const accounts = await accountService.getBillsByDayService(startDate, endDate);

  //         if (!accounts.length) {
  //             return res.status(404).json({
  //                 message: "No bills found for the given date",
  //             });
  //         }

  //         res.status(200).json({
  //             message: "Bills found",
  //             data: accounts
  //         });
  //     } catch (error) {
  //         res.status(500).json({
  //             message: Failed to fetch bills by date: ${error.message},
  //         });
  //     }
  // },

  async getBillsByWeek(req, res) {
    try {
      const { org_id, startDate } = req.body; // Use query parameters for GET requests

      if (!org_id || !startDate) {
        return res.status(400).json({
          message: "startDate query parameter is required",
        });
      }
      console.log(startDate, "jur");
      const bills = await accountService.getBillsByWeekService(org_id, startDate);
      return res.status(200).json(bills);
    } catch (error) {
      return res.status(500).json({
        message: `Failed to get bills by week: ${error.message}`,
      });
    }
  },

  // ==================
  getBillsByYear: async (req, res, next) => {
    try {
      const date = req.params.date;
      const bills = await accountService.getBillsByYearService(date);
      res.status(200).json(bills);
    } catch (error) {
      return res
        .status(404)
        .json({ status: 400, message: "No matching results found" });
    }
  },

  // =================================
  updateBillStatus: async (req, res, next) => {
    console.log("req.body", req.body);
    try {
      const updateBillStatus = await accountService.updateBillStatus(req.body);
      res.status(200).json(updateBillStatus);
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  // ===========

  saveBillFilter: async (req, res, next) => {
    try {
      const { customerName, phoneNumber } = req.body;

      const getAllCustomers = await accountService.saveBillFilter(
        customerName,
        phoneNumber
      );

      res.status(200).json({
        message: "Get All customers Details",
        data: getAllCustomers,
      });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },
  //============================================================
  selectTablename: async (req, res, next) => {
    try {
      const getTableName = await accountService.selectTablename(req.body);
      res.status(200).json({
        message: "get table name",
        data: getTableName,
      });
    } catch (error) {
      error.error = error.message;
      error.statuscode = 400;
      console.error(error);
      next(error);
    }
  },
  //=======================================================
  dineinBill: async (req, res, next) => {
    try {
      const getTableBill = await accountService.dineinBill(req.body);
      res.status(200).json({
        message: "get table name",
        data: getTableBill,
      });
    } catch (error) {
      error.error = error.message;
      error.statuscode = 400;
      console.error(error);
      next(error);
    }
  },
  // ============================
  updateOrderStatus: async (req, res, next) => {
    try {
      const updateOrderStatus = await accountService.updateOrderStatus(
        req.body
      );
      res.status(200).json({
        data: updateOrderStatus,
      });
    } catch (error) {
      error.error = error.message;
      error.statuscode = 400;
      console.error(error);
      next(error);
    }
  },
};

export default accountController;
