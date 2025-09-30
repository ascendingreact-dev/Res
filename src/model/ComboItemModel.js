import mongoose from "../db/db.js";

const comboItemSchema = new mongoose.Schema(
  { 
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    combo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comboDeals',
      required: true
    },
    menu_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItems', // Make sure you have a model for MenuItems
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

const ComboItemModel = mongoose.model('menuItemCombos', comboItemSchema);

export default ComboItemModel;
