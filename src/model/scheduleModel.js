import mongoose from "../db/db.js";

const scheduleSchema = new mongoose.Schema(
  {
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
    shift_start:{
        type:String,
        required:true
    },
    shift_end:{
        type:String,
        required:true
    },
    shift_type:{
        type:String,
        enum:['Morning', 'Evening', 'Night'],
        required:true
    },
    status:{
        type:String,
        enum:['Scheduled', 'Completed', 'Cancelled'],
        required:true
    },
    timestamp:{ 
        type: Date, 
        default: Date.now
    },
  },
  { versionKey: false }
);
scheduleSchema.virtual("schedule_id").get(function () {
  return this._id.toString();
});
const scheduleModel= mongoose.model("schedule", scheduleSchema);

export default scheduleModel;