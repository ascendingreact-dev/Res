import mongoose from "../db/db.js";
const receiptsSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    order_id:{
        type:String,
        required:true
    },
    receipt_type:{
        type:String,
        required:true
    },
    receipt_data:{
        type:String,
        required:true
    },
    receipt_date: 
    {
        type: Date, 
        default: Date.now },
  },
  { versionKey: false }
);
receiptsSchema.virtual("receipt_id").get(function () {
  return this._id.toString();
});
const receiptsModel = mongoose.model("receipts", receiptsSchema);

export default receiptsModel;