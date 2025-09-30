import mongoose from "../db/db.js";
const TaskSchema = new mongoose.Schema(
  {
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    employee_id:{
        type:String,
        ref:"employee",
        required:true
    },
    task_name:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:['High', 'Medium', 'Low'],
        required:true
    },
    status:{
        type:String,
        enum:['NotStarted', 'InProgress', 'Completed'],
        required:true
    },
    timestamp:{
        type: Date, 
        default: Date.now
      },
  },
  { versionKey: false }
);
TaskSchema.virtual("task_id").get(function () {
  return this._id.toString();
});
const TaskModel= mongoose.model("task", TaskSchema);

export default TaskModel;