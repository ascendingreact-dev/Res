// cron/planValidator.js
import cron from 'node-cron';
import organizationModel from '../model/organizationModel.js';

cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const organizations = await organizationModel.find();

       for (const org of organizations) {
      const isExpired = new Date(org.validto) < now;

      // ✅ Only update if status changed
      if (org.isPlanExpired !== isExpired) {
        org.isPlanExpired = isExpired;
        await org.save();
        console.log(`🔄 Updated org ${org._id} - isPlanExpired: ${isExpired}`);

        // ⏱️ Real-time force logout via socket.io
        if (isExpired && global.io) {
          const room = `org_${org._id.toString()}`;
          global.io.to(room).emit("planExpired", {
            message: "Plan expired. Logging out...",
          });
          console.log(`⚠️ Socket emit to ${room}`);
        }
      }
    }



    console.log("✅ Plan statuses updated.");
  } catch (error) {
    console.error("❌ Plan validation failed:", error);
  }
});
