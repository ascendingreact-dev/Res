import mongoose from "../db/db.js";
const userRoleSchema = new mongoose.Schema({
  admin_id:{
    type:String,
    required:false
  },
  org_id:{
    type:String,
    required:false
  },  
  role_name:{
        type:String,
        required:true
    },
    permissions:{
        type:String,
        required:true
    },
  timestamp: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});
userRoleSchema.virtual("user_id").get(function () {
  return this._id.toString();
});
const userRoleModel = mongoose.model("userRoles", userRoleSchema);

export default userRoleModel;