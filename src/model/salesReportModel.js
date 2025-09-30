import mongoose from "../db/db.js";
const salesReportSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    report_date:{
      type: Date, 
      default: Date.now 
    },
    total_sales:{
      type:String,
      required:true
    },
    total_transactions:{
      type:String,
      required:true
    },
    report_data:{
      type:String,
      required:true
    }
  },
  { versionKey: false }
);
salesReportSchema.virtual("report_id").get(function () {
  return this._id.toString();
});
const salesReportModel = mongoose.model("salesReport", salesReportSchema);

export default salesReportModel;