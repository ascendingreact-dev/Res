import mongoose from "../db/db.js";
const purchaseSchema = new mongoose.Schema({
  admin_id:{
    type:String,
    required:false
  },
  org_id:{
    type:String,
    required:false
  },
  supplier_id: {
    type: String,
    ref:"order",
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enu:["Pending","Completed"],
    required: true,
  },
  

  order_date: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});
purchaseSchema.virtual("PurchaseOrder_id").get(function () {
  return this._id.toString();
});
const purchaseModel = mongoose.model("purchaseOrder", purchaseSchema);

export default purchaseModel;