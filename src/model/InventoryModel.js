import mongoose from "../db/db.js";
const inventorySchema = new mongoose.Schema({
  admin_id:{
    type:String,
    required:false
  },
  org_id:{
    type:String,
    required:false
  },
  Product_id: {
    type: String,
    ref:"Product",
    required: true,
  },
  location_id: {
    type: String,
    required: true,
  },
  reorder_point: {
    type: String,
    required: false,
  },

  timestamp: {
    type: Date,
    default: Date.now
  },
  
}, {
  versionKey: false
});
inventorySchema.virtual("inventory_id").get(function () {
  return this._id.toString();
});
const inventoryModel = mongoose.model("inventory", inventorySchema);

export default inventoryModel;