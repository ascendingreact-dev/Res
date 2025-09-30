import mongoose from "../db/db.js";

const TimeRequestSchema = new mongoose.Schema(
  {
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    employee_id:{
        type:String,
        ref:"employee",
        required:true
    },
    request_date:{
        type:String,
        required:true
    },
    start_date:{
        type:String,
        required:true
    },
    end_date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending', 'Approved', 'Rejected'],
        required:true
    },
    timestamp:{
        type: Date, 
        default: Date.now
    }
  },
  { versionKey: false }
);
TimeRequestSchema.virtual("request_id").get(function () {
  return this._id.toString();
});
const TimeOffRequestsModel= mongoose.model("request", TimeRequestSchema);

export default TimeOffRequestsModel;