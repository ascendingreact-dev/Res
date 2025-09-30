import mongoose from "../db/db.js";
const deviceSchema = new mongoose.Schema({
    org_id:{
        type:String,
        required:false
    },
    id:{
        type:String,
        ref:"userRegister"
    }, //id- refered the userID
    admin_id:{
        type:String,
        ref:"admin"
    },
    appName:{
        type:String
    },
    fcm_token:{
        type:String,
        required:true
    },
     updatedAt: { type: Date, default: Date.now },
}, {
    versionKey: false
});
deviceSchema.virtual("device_id").get(function () {
    return this._id.toString();
});
const deviceTokenModel = mongoose.model("deviceToken", deviceSchema);

export default deviceTokenModel;