import mongoose from "../db/db.js";
const tableTurnoverSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    table_id:{
        type:String,
        required:true
    },
    //occupied_start_time,
    //occupied_end_time,
    //total_turnover_time
  },
  { versionKey: false }
);
tableTurnoverSchema.virtual("turnover_id").get(function () {
  return this._id.toString();
});
const  tableTurnoverModel= mongoose.model("tableTurnover", tableTurnoverSchema);

export default tableTurnoverModel;