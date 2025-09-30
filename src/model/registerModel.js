import mongoose from "../db/db.js";
const registerSchema = new mongoose.Schema(
  {
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    userName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    applogo_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adminImg: {
      type: String,
      required: false,
    },
    mobileNo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    fcmToken:{
      type: String,
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);
registerSchema.virtual("admin_id").get(function () {
  return this._id.toString();
});
const registerModel = mongoose.model("admin", registerSchema);

export default registerModel;
