import mongoose from "../db/db.js";

const purchaseSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
    },
    org_id: {
      type: String,
      required: true,
    },
    Product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    ProductName: {
      type: String,
      require: true,
    },
    unit: {
      type: String,
      required: true,
    }, 
    quantity_purchased: {
      type: Number,
      required: true,
      min: 1,
    },
    purchase_price: {
      type: Number,
      required: true,
    },
    purchase_date: {
      type: String,
      required: true,
    },
     expire_date: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);
purchaseSchema.virtual("purchaseHistory_id").get(function () {
  return this._id.toString();
});
const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
export default PurchaseModel;
