import mongoose from "../db/db.js";
const auditReportSchema = new mongoose.Schema({

    report_data: {
       type: Object,
        required: false,
    },
    admin_id: {
       type: String,
        required: false,
    },   
     org_id: {
        type: String,
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
auditReportSchema.virtual("report_id").get(function () {
    return this._id.toString();
});
const auditReportModel = mongoose.model("auditReport", auditReportSchema);

export default auditReportModel;