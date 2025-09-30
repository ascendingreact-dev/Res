import express from "express"
import notificationController from "../controller/notificationController.js"

const route = express.Router()

route.post('/saveToken', notificationController.saveToken)
route.get('/getNotification/:org_id/:admin_id', notificationController.getNotification)
route.put('/updateNotifyMark', notificationController.updateNotificationMark)
route.get("/notifyCount/:org_id/:admin_id", notificationController.getNotificationCount)
route.post('/send', notificationController.sendFcmToAdmin)
route.post("/send-accounts",notificationController.sendNotifyToAccounts)
route.post("/send-kitchen", notificationController.sendNotifyToKitchen)
route.post("/send_waiter", notificationController.sendNotifyToWaiter)

//==================================================================================


/* route.post("/save_token", notificationController.saveFcmToken)
route.post("/send_notification", notificationController.sendNotificationToKitchen)

route.post("/foodReady_notify", notificationController.sendFoodReadyNotification)

route.post("/bill_notification", notificationController.moveBillNotification)
 
route.post('/admin_bill', notificationController.sendBillCompletedNotificationToAdmin) */

export default route