import deviceTokenModel from "../model/deviceModel.js";
import admin from "../../firebaseConfig.js";
import registerModel from "../model/registerModel.js";
import userRegModel from "../model/userRegModel.js";
import organizationModel from "../model/organizationModel.js";
import notificationModel from "../model/notificationModel.js";

const notificationService = {
  saveToken: async (data) => {
    const { id, org_id, fcmToken, applogo_id } = data;
    try {
      if (applogo_id === "0") {
        const admin = await registerModel.findOneAndUpdate(
          { _id: id, org_id, applogo_id },
          { $set: { fcmToken } },
          { new: true }
        );

        if (!admin) throw new Error("Admin not found");

        console.log("✅ Admin token saved:", admin.fcmToken);
        return { token: admin.fcmToken };
      } else {
        const user = await userRegModel.findById(id);
        if (!user) throw new Error("User not found");
        const updateUser = await userRegModel.findOneAndUpdate(
          { _id: id, org_id, applogo_id },
          { $set: { fcmToken } },
          { new: true }
        );
        return { token: updateUser.fcmToken };
      }
    } catch (error) {
      throw error;
    }
  },

  getNotification: async (data) => {
    const { org_id, admin_id, isRead } = data;

    try {
      const org = await organizationModel.findById(org_id);

      
      
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }

      let notifications;

      if (isRead === "all") {
        notifications = await notificationModel
          .find({ org_id })
          .sort({ createdAt: -1 });
      } else if (isRead === "read") {
        notifications = await notificationModel
          .find({ org_id, isRead: true })
          .sort({ createdAt: -1 });
      } else if (isRead === "unRead") {
        notifications = await notificationModel
          .find({ org_id, isRead: false })
          .sort({ createdAt: -1 });
      } else {
        throw new Error(
          "Invalid value for isRead. Use 'all', 'read', or 'unRead'."
        );
      }

      return notifications;
    } catch (error) {
      console.error("❌ Error in getNotification:", error);
      throw error;
    }
  },

  // updateNotificationMark: async (data) => {
  //   const { org_id, admin_id, notification_id } = data;
  //   try {
  //     const org = await organizationModel.findById(org_id);
  //     if (!org) {
  //       throw new Error("Organization not found");
  //     }

  //     const admin = await registerModel.findById(admin_id);
  //     if (!admin) {
  //       throw new Error("Admin not found");
  //     }
  //     const notify = await notificationModel.findOne({
  //       org_id,
  //       _id: notification_id,
  //     });
  //     if (!notify) {
  //       throw new Error("notify not found");
  //     }

  //     const updateStatus = await notificationModel.findOneAndUpdate(
  //       { _id: notification_id, org_id, admin_id },
  //       { isRead: true },
  //       { new: true }
  //     );
  //     return updateStatus;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  /*  updateNotificationMark: async (data) => {
    const { org_id, admin_id, notification_ids } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const updateStatus = await notificationModel.updateMany(
        {  _id: { $in: notification_ids }, org_id, admin_id, isRead:false },
         { $set: { isRead: true } },
        { new: true }
      );
      return updateStatus;
    } catch (error) {
      throw error;
    }
  }, */

  updateNotificationMark: async (data) => {
    const { org_id, admin_id, notifications } = data;

    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const notificationIds = notifications.map((n) => n.id);
      const existingNotifications = await notificationModel.find({
        _id: { $in: notificationIds },
        org_id: org_id,
      });

      if (existingNotifications.length !== notificationIds.length) {
        throw new Error(
          "One or more notification IDs are invalid or do not belong to the given organization"
        );
      }

      const updateStatus = await notificationModel.updateMany(
        { _id: { $in: notificationIds }, org_id, admin_id, isRead: false },
        { $set: { isRead: true } }
      );
      console.log(updateStatus);
      return updateStatus;
    } catch (error) {
      throw error;
    }
  },

  getNotificationCount: async (data) => {
    const { org_id, admin_id } = data;
    try {
      const org = await organizationModel.findById(org_id);
      if (!org) {
        throw new Error("Organization not found");
      }

      const admin = await registerModel.findById(admin_id);
      if (!admin) {
        throw new Error("Admin not found");
      }
      const count = await notificationModel.countDocuments({
        org_id,
        admin_id,
        isRead: false,
      });
      return count;
    } catch (error) {
      throw error;
    }
  },

 /*  sendFcmToAdmin: async (token, notificationData) => {
    const message = {
      notification: {
        title: notificationData.title,
        body: notificationData.body,
      },
      token: token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("✅ Notification sent successfully:", response);
    } catch (error) {
      throw error;
    }
  }, */

  sendFcmToAdmin: async (org_id, notificationData) => {
    try {
      console.log("Received org_id:", org_id,typeof org_id);
      const adminUser = await registerModel.findOne({ org_id });

      if (!adminUser) {
        console.log(`⚠️ No admin found for org_id: ${org_id}`);
        return;
      }

      if (!adminUser.fcmToken) {
        console.log(`⚠️ Admin for org_id ${org_id} does not have an FCM token`);
        return;
      }

      const message = {
        data: {
          title: notificationData.title,
          body: notificationData.body,
        },
        token: adminUser.fcmToken,
      };
      console.log("📩 Sending FCM to admin:", adminUser.fcmToken);

      const response = await admin.messaging().send(message);
      console.log("✅ Notification sent successfully:", response);
    } catch (error) {
      throw error;
    }
  },

  sendNotifyToAccounts: async (org_id, notificationData) => {
    try {
       const kitchenUsers = await userRegModel.find({
        org_id,
        role: "Accounts",
      });
      const tokens = kitchenUsers
        .map((device) => device.fcmToken)
        .filter(Boolean);

      if (tokens.length === 0) {
        console.log("🚫 No kitchen tokens found.");
        return;
      }

      const message = {
        notification: {
          title: notificationData.title,
          body: notificationData.body,
        },
        tokens,
      };
      console.log("📲 FCM Tokens:", tokens);

      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("✅ Notification sent to Accounts", response);
    } catch (error) {
      throw error;
    }
  },

  sendNotifyToKitchen: async (org_id, notificationData) => {
    try {
      const kitchenUsers = await userRegModel.find({
        org_id,
        role: "Kitchen",
      });
      const tokens = kitchenUsers
        .map((device) => device.fcmToken)
        .filter(Boolean);

      if (tokens.length === 0) {
        console.log("No kitchen tokens found.");
        return;
      }

      const message = {
        notification: {
          title: notificationData.title,
          body: notificationData.body,
        },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("✅ Notification sent to Kitchen", response);
    } catch (error) {
      throw error;
    }
  },

  sendNotifyToWaiter: async (org_id, notificationData) => {
    try {
        const kitchenUsers = await userRegModel.find({
        org_id,
        role: "Waiter",
      });
      const tokens = kitchenUsers
        .map((device) => device.fcmToken)
        .filter(Boolean);

      if (tokens.length === 0) {
        console.log("No kitchen tokens found.");
        return;
      }

      const message = {
        notification: {
          title: notificationData.title,
          body: notificationData.body,
        },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("✅ Notification sent to Waiter", response);
    } catch (error) {
      throw error;
    }
  },

  //===================================================================================================
/* 
  saveFcmToken: async (data) => {
    const { org_id, fcm_token, id, admin_id, appName } = data;
    console.log("Token data received:", data);

    try {
      if (!org_id || !fcm_token || !appName) {
        throw new Error(
          "Missing required fields (org_id, fcm_token, id, or appName)"
        );
      }

      const saveToken = await deviceTokenModel.updateOne(
        { org_id, id },
        {
          $set: {
            fcm_token,
            appName,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      console.log("Token save result:", saveToken);
      return saveToken;
    } catch (error) {
      throw error;
    }
  },

  sendNotificationToKitchen: async (org_id, orderInfo) => {
    const devices = await deviceTokenModel.find({
      org_id,
      appName: "Kitchen",
    });
    const tokens = devices.map((device) => device.fcm_token).filter(Boolean);

    if (tokens.length === 0) {
      console.log("No kitchen tokens found.");
      return;
    }

    const message = {
      notification: {
        title: "🍽️ New Order Received",
        body: `Order #${orderInfo.KOT_No} placed.`,
      },
      data: {
        orderId: orderInfo.userOrder_id.toString(),
        tableId: orderInfo.table_id,
        type: "NEW_ORDER",
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`${response.successCount} notifications sent.`);
      return response;
    } catch (err) {
      console.error("Notification Error:", err);
      console.log("Token data received:", data);
      throw new Error("Failed to send notification");
    }
  },

  sendFoodReadyNotification: async (
    org_id,
    table_no,
    OrderType,
    waiter_id,
    orderInfo
  ) => {
    try {
      let tokens = [];
      let targetApp = "";

      if (OrderType === "Dine-In") {
        const waiterDevice = await deviceTokenModel.findOne({
          org_id,
          id: waiter_id,
          appName: "Waiter",
        });

        if (waiterDevice?.fcm_token) {
          tokens.push(waiterDevice.fcm_token);
          targetApp = "Waiter";
        }
      } else if (OrderType === "Takeaway") {
        const accountDevices = await deviceTokenModel.find({
          org_id,
          appName: "Accounts",
        });

        tokens = accountDevices.map((d) => d.fcm_token).filter(Boolean);
        targetApp = "Accounts";
      }

      if (tokens.length === 0) {
        console.log(`No ${targetApp} device tokens found.`);
        return { successCount: 0, failureCount: 0 };
      }

      const message = {
        notification: {
          title: "🍱 Food Ready",
          body: `Order #${orderInfo.KOT_No} is ready for ${OrderType}.`,
        },
        data: {
          orderId: orderInfo.userOrder_id.toString(),
          type: "FOOD_READY",
          table_no: table_no || "",
          OrderType,
        },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(
        `Food ready notification sent to ${targetApp}: ${response.successCount} success`
      );
      return response;
    } catch (err) {
      console.error("Food Ready Notification Error:", err.message);
      throw new Error("Failed to send food ready notification");
    }
  },

  moveBillNotification: async (org_id, orderInfo) => {
    const devices = await deviceTokenModel.find({
      org_id,
      appName: "Accounts",
    });
    const tokens = devices.map((device) => device.fcm_token).filter(Boolean);

    if (tokens.length === 0) {
      console.log("No kitchen tokens found.");
      return;
    }

    const message = {
      notification: {
        title: "🍽️ Order Completed, Ready to payment",
        body: `Order #${orderInfo.KOT_No} placed.`,
      },
      data: {
        orderId: orderInfo.userOrder_id.toString(),
        type: "COMPLETE_ORDER",
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`${response.successCount} notifications sent.`);
      return response;
    } catch (err) {
      console.error("Notification Error:", err);
      console.log("Token data received:", data);
      throw new Error("Failed to send notification");
    }
  },

  sendBillCompletedNotificationToAdmin: async (org_id, billInfo) => {
    const adminDevices = await deviceTokenModel.find({
      org_id,
      appName: "Admin",
    });

    const tokens = adminDevices.map((d) => d.fcm_token).filter(Boolean);

    if (tokens.length === 0) {
      console.log("No Admin device tokens found.");
      return { successCount: 0, failureCount: 0 };
    }

    const message = {
      notification: {
        title: "✅ Bill Completed",
        body: `Bill #${billInfo.Bill_No} has been marked as completed.`,
      },
      data: {
        billId: billInfo._id.toString(),
        type: "BILL_COMPLETED",
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`Admin notification sent: ${response.successCount} success`);
      return response;
    } catch (err) {
      console.error("Admin Notification Error:", err.message);
      throw new Error("Failed to send admin bill completed notification");
    }
  }, */
};

export default notificationService;
