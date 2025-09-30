import notificationService from "../service/notificationService.js";

const notificationController = {

  saveToken: async (req, res, next) => {
    try {
      const token = await notificationService.saveToken(req.body);
      console.log("Request body:", req.body);
      return res.status(200).json({ message: "token saved", data: token });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getNotification: async(req, res, next) =>{
    try {
      const {org_id, admin_id} = req.params
      const {isRead} = req.query
      const token = await notificationService.getNotification({org_id, admin_id, isRead});
      console.log("Request body:", req.body);
      return res.status(200).json({ message: "token saved", data: token });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  updateNotificationMark :async(req, res, next) =>{
    try {
      const updateNotify = await notificationService.updateNotificationMark(req.body);
      console.log("Request body:", req.body);
      return res.status(200).json({ message: "updated status", data: updateNotify });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  getNotificationCount:async(req, res, next) =>{
    try {
      const newCount = await notificationService.getNotificationCount(req.params);
      console.log("Request body:", req.body);
      return res.status(200).json({ message: "unseen notify count", data: {count:newCount} });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  sendFcmToAdmin :async (req, res, next) => {
    try {
      const token = await notificationService.sendFcmToAdmin(req.body);
      console.log("Request body:", req.body);
      return res.status(200).json({ message: "token saved", data: token });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  sendNotifyToAccounts: async (req, res, next) => {
  try {
    const { org_id, notificationData } = req.body;

    if (!org_id || !notificationData) {
      return res.status(400).json({ message: "org_id and notificationData are required" });
    }

    const result = await notificationService.sendNotifyToAccounts(org_id, notificationData);
    return res.status(200).json({ message: "Notification sent successfully", data: result });
  } catch (error) {
    error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
  }
},

sendNotifyToKitchen: async (req, res, next) => {
  try {
     const { org_id, notificationData } = req.body;

    if (!org_id || !notificationData) {
      return res.status(400).json({ message: "org_id and notificationData are required" });
    }

    const result = await notificationService.sendNotifyToKitchen(org_id, notificationData);
    return res.status(200).json({ message: "Notification sent successfully", data: result });
  } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
  }
},

sendNotifyToWaiter: async (req, res, next) => {
  try {
     const { org_id, notificationData } = req.body;

    if (!org_id || !notificationData) {
      return res.status(400).json({ message: "org_id and notificationData are required" });
    }

    const result = await notificationService.sendNotifyToWaiter(org_id, notificationData);
    return res.status(200).json({ message: "Notification sent successfully", data: result });
  } catch (error) {
     error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
  }
},

  //===========================================================================================

 /*   saveFcmToken: async (req, res, next) => {
    try {
      const token = await notificationService.saveFcmToken(req.body);
      return res.status(200).json({ message: "token saved", data: token });
    } catch (error) {
      error.error = error.message;
      console.error(error);
      error.statuscode = 400;
      next(error);
    }
  },

  sendNotificationToKitchen: async (req, res, next) => {
    try {
      const { org_id, orderInfo } = req.body;

      if (!org_id || !orderInfo) {
        return res.status(400).json({ message: "Missing org_id or orderInfo" });
      }

      const result = await notificationService.sendNotificationToKitchen(
        org_id,
        orderInfo
      );

      return res.status(200).json({
        message: "Notification sent to kitchen devices",
        sent: result.successCount,
        failed: result.failureCount,
      });
    } catch (error) {
      console.error("Controller Notification Error:", error.message);
      error.statuscode = 500;
      next(error);
    }
  },

  sendFoodReadyNotification: async (req, res, next) => {
    try {
      const { org_id, table_no, OrderType, waiter_id, orderInfo } = req.body;

      if (
        !org_id ||
        !OrderType ||
        !orderInfo ||
        (OrderType === "Dine-In" && !waiter_id)
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await notificationService.sendFoodReadyNotification(
        org_id,
        table_no,
        OrderType,
        waiter_id,
        orderInfo
      );

      res.status(200).json({
        message: `Food ready notification sent to ${
          OrderType === "Dine-In" ? "Waiter" : "Accounts"
        }`,
        sent: result.successCount,
        failed: result.failureCount,
      });
    } catch (err) {
      console.error("Controller Error:", err.message);
      next(err);
    }
  },

  moveBillNotification: async (req, res, next) => {
    try {
      const { org_id, orderInfo } = req.body;

      if (!org_id || !orderInfo) {
        return res.status(400).json({ message: "Missing org_id or orderInfo" });
      }

      const result = await notificationService.moveBillNotification(
        org_id,
        orderInfo
      );

      return res.status(200).json({
        message: "Notification sent to kitchen devices",
        sent: result.successCount,
        failed: result.failureCount,
      });
    } catch (error) {
      console.error("Controller Notification Error:", error.message);
      error.statuscode = 500;
      next(error);
    }
  },

  sendBillCompletedNotificationToAdmin:async(req, res, next) =>{
    try {
      const { org_id, billInfo } = req.body;

      if (!org_id || !billInfo) {
        return res.status(400).json({ message: "Missing org_id or orderInfo" });
      }

      const result = await notificationService.sendBillCompletedNotificationToAdmin(
        org_id,
        billInfo
      );

      return res.status(200).json({
        message: "Notification sent to kitchen devices",
        sent: result.successCount,
        failed: result.failureCount,
      });
    } catch (error) {
      console.error("Controller Notification Error:", error.message);
      error.statuscode = 500;
      next(error);
    }
  } */
};

export default notificationController;
