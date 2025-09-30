import mongoose from "../db/db.js";

const menuItemDetailsSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  menuImg: {
    type: String,
    required: true,
  },
  menuType: {
    type: String,
    required: true,
  },
  Barcode: {
    type: String,
    required: false,
  },
  allergen_info: {
    type: String,
    required: false,
  },
  dietary_info: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: false,
  },
});

const menuItemSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: false,
    },
    org_id: {
      type: String,
      required: false,
    },
    menu_Category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menuCategoryModel",
      required: true,
    },
    menuItems: [menuItemDetailsSchema],

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

menuItemSchema.virtual("menu_item_id").get(function () {
  return this._id.toString();
});

const menuitemModel = mongoose.model("menuItems", menuItemSchema);

export default menuitemModel;
