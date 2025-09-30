import mongoose from "../db/db.js";

const inventoryUsageSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    org_id: {
      type: String,
      required: true,
    },
    admin_id: {
      type: String,
      required: true,
    },
    Product_id: {
      type: String,
      required: true,
    },
    ProductName: {
      type: String,
      require: true,
    },
    used_by: {
      type: String,
      required: true,
    },
    taken_quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      // enum: ['Kg', 'Litre', 'Pieces', 'bunch', 'tray', 'pack', 'can', 'bottle', 'slice', 'scoop', 'cup', 'box', 'stick'],
      enum: ["kg", "litre", "piece", "packet","gram","ml"],
      required: true,
    },
    action_type: {
      type: String,
      enum: ["Used", "Expried", "Spoiled"],
      // default: "Used",
    },
    available_unit: {
      type: Number,
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

inventoryUsageSchema.virtual("inventoryUsage_id").get(function () {
  return this._id.toString();
});
const inventoryUsageModel = mongoose.model(
  "InventoryUsage",
  inventoryUsageSchema
);

export default inventoryUsageModel;
