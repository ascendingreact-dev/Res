import mongoose from "../db/db.js";
const UsageReportsSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    report_data: {
       type: Object,
        required: true,
    },
    total_value: {
        type:Number,
        required: true,
    },
    report_date: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});
UsageReportsSchema.virtual("report_id").get(function () {
    return this._id.toString();
});
const UsageReportModel = mongoose.model("UsageReport", UsageReportsSchema);

export default UsageReportModel;