import mongoose from "../db/db.js";
const stockValidationSchema = new mongoose.Schema({

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
stockValidationSchema.virtual("report_id").get(function () {
    return this._id.toString();
});
const stockValidationModel = mongoose.model("stockValidation", stockValidationSchema);

export default stockValidationModel;