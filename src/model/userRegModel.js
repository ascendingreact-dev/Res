import mongoose from "../db/db.js";
const userSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
    },
    org_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    applogo_id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Waiter", "Accounts", "Kitchen"],
      required: true,
    },
    EmailId: {
      type: String,
      required: false,
    },
    Tables: {
      type: [String],
      required: false,
    },
    Userstatus: {
      type: String,
      enum: ["Active", "Leave", "Terminated"],
      required: false,
    },
    ContactNo: {
      type: Number,
      required: true,
    },
    AccountNo: {
      type: Number,
      required: false,
    },
    IFSCcode: {
      type: String,
      required: false,
    },
    BranchName: {
      type: String,
      required: false,
    },
    PANnumber: {
      type: String,
      required: false,
    },
    emp_name: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
      required: false,
    },
    EmailId: {
      type: String,
      required: false,
    },
    employee: [
      {
        appName: {
          type: String,
          required: false,
        },
        emp_id: {
          type: String,
          required: false,
        },
      },
    ],
    status: {
      type: String,
      required: false,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
userSchema.virtual("userReg_id").get(function () {
  return this._id.toString();
});
const userRegModel = mongoose.model("userRegister", userSchema);

export default userRegModel;

/* import mongoose from "../db/db.js";
const userSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
    },
    org_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    applogo_id: {
      type: String,
      required: true,
    },
    emp_name: {
      type: String,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
      required: false,
    },

    EmailId: {
      type: String,
      required: false,
    },
    userDetails_id: {
      type: String,
      ref: "userRegisterDetail",
      required: true,
    },
    employee: [
      {
        appName: {
          type: String,
          required: false,
        },
        emp_id: {
          type: String,
          required: false,
        },
      },
    ],
    status: {
      type: String,
      required: false,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
userSchema.virtual("id").get(function () {
  return this._id.toString();
});
const userRegModel = mongoose.model("userRegister", userSchema);

export default userRegModel;
 */
