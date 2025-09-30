import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["customer", "kitchen_order", "bill", "foodReady","stockAlert"],
      default: "custom",
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "register",
      required: true,
    },
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

notificationSchema.virtual("notification_id").get(function () {
    return this._id.toString();
  });

const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;
