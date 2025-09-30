import mongoose from "../db/db.js";
const productSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
    },
    org_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    ProductName: {
      type: String,
      require: true,
    },
    Unit: {
      type: String,
      enum: ["kg", "litre", "piece", "packet","gram","ml"],
      required: true,
    },

    // Price: {
    //   type: Number,
    //   required: true,
    // },
    totalPurchase_Price:{
      type: Number,
      required: true,
    },
    recentPurchase_date: {
      type: String,
      required: true,
    },
    recentExpire_date: {
      type: String,
      required: true,
    },

    supplier_id: {
      type: String,
      required: false,
    },
    stock_quantity: {
      type: Number,
      required: true,
    },
    storageLocation:{
        type:String,
        required:true
    },
    minStock:{
        type:Number,
        required:true,
        min: 0
    },
    // stock_status: {
    //   type: String,
    //   enum: ["In Stock", "Low Stock"],
    //   required: true,
    // },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);
productSchema.virtual("Product_id").get(function () {
  return this._id.toString();
});
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
