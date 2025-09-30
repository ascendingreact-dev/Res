import mongoose from "../db/db.js";
const purchaseItermSchema = new mongoose.Schema({

  admin_id:{
    type:String,
    required:false
  },
  org_id:{
    type:String,
    required:false
  },
  PurchaseOrder_id: {
    type:String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false
});
purchaseItermSchema.virtual("PurchaseOrderItem_id").get(function () {
  return this._id.toString();
});
const purchaseItermModel = mongoose.model("purchaseOrderItem", purchaseItermSchema);

export default purchaseItermModel;