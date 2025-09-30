import mongoose from "../db/db.js";
const tableAssignmentsSchema = new mongoose.Schema(
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
    table_id:{
        type:String,
        required:true
    },
    assignment_date:{
        type: Date,
        default: Date.now 
    },
    //assignment_time:{
      //  type:String,
        //require:true
    //}
    
  },
  { versionKey: false }
);
tableAssignmentsSchema.virtual("assignment_id").get(function () {
  return this._id.toString();
});
const  tableAssignmentModel= mongoose.model("tableAssignments", tableAssignmentsSchema);

export default tableAssignmentModel;