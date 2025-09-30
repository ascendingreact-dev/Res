import mongoose from "mongoose";

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
    report_date: {
      type: Date,
      default: Date.now,
    },
    total_sales: {
      type: Number,
      required: true,
    },

    best_selling_items: {
      type: [String], // Array of item names or IDs
      default: [], // Default to an empty array
    },
    underperforming_items: {
      type: [String], // Array of item names or IDs
      default: [], // Default to an empty array
    },
    report_data: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

salesReportSchema.virtual("report_id").get(function () {
  return this._id.toString();
});

const reportSalesModel = mongoose.model("salesreport", salesReportSchema);

export default reportSalesModel;
