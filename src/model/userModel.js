import mongoose from "../db/db.js";
const customerSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: false
  },
  org_id: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["Waiter", "Accounts", "Kitchen"],
    required: false
  },
  EmailId: {
    type: String,
    required: false
  },
  employee_id:{
    type: String,
    ref:"userRegister",
    required:false
  },
  employee_Name: {
    type: String,
  },
  Tables: {
    type: [String],
    required: true
  },
  RegDate: {
    type: String,
    required: false
  },
  status: {
    type: String,

    required: false
  },
  Userstatus: {
    type: String,
    enum: ['Active', 'Leave', 'Terminated'],
    required: false
  },
  ContactNo: {
    type: Number,
    required: true
  },

  AccountNo: {
    type: Number,
    required: true
  },
  IFSCcode: {
    type: String,
    required: true
  },
  BranchName: {
    type: String,
    required: true
  },
  PANnumber: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});
customerSchema.virtual("userDetails_id,").get(function () {
  return this._id.toString();
});
const userModel = mongoose.model("userRegisterDetail", customerSchema);

export default userModel;

/* import mongoose from "../db/db.js";
const customerSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: false
  },
  org_id: {
    type: String,
    required: false
  },
  applogo_id: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["Waiter", "Accounts", "Kitchen"],
    required: false
  },
  EmailId: {
    type: String,
    required: false
  },
  password:{
        type:String,
        required:true
    },
  // employee_id:{
  //   type: String,
  //   ref:"userRegister",
  //   required:false
  // },
  emp_id:{
    type: String,
    required:false
  },
  employee_Name: {
    type: String,
  },
  Tables: {
    type: [String],
    required: true
  },
  RegDate: {
    type: String,
    required: false
  },
  status: {
    type: String,

    required: false
  },
  Userstatus: {
    type: String,
    enum: ['Active', 'Leave', 'Terminated'],
    required: false
  },
  ContactNo: {
    type: Number,
    required: true
  },

  AccountNo: {
    type: Number,
    required: true
  },
  IFSCcode: {
    type: String,
    required: true
  },
  BranchName: {
    type: String,
    required: true
  },
  PANnumber: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});
customerSchema.virtual("userDetails_id,").get(function () {
  return this._id.toString();
});
const userModel = mongoose.model("userRegisterDetail", customerSchema);

export default userModel; */