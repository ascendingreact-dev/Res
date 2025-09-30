import mongoose from "../db/db.js";
const comboDealsSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    combo_name:{
        type:String,
        required:true
    },
    combo_description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        required:true
    },
 
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
comboDealsSchema.virtual("combo_id").get(function () {
  return this._id.toString();
});
const comboDealsModel = mongoose.model("comboDeals", comboDealsSchema);

export default comboDealsModel;
