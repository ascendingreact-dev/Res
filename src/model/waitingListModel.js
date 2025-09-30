import mongoose from "../db/db.js";
const waitingListSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    waitlist_id:{
        type:String,
        required:true
    },
    customer_id:{
        type:String,
        required:true
    },
    waitlist_date:{
        type: Date,
        default: Date.now
    },
    //estimated_wait_time:{
    //    type:String,
    //    require:true
    //},
    status:{
        Waiting:{
            type:String,
            required:true
        },
        Seated:{
            type:String,
            required:true
        }
    }
  },
  { versionKey: false }
);
waitingListSchema.virtual("turnover_id").get(function () {
  return this._id.toString();
});
const  waitingListModel= mongoose.model("waitingList", waitingListSchema);

export default waitingListModel;