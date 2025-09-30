import mongoose from "../db/db.js";
const feeedbackSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    menu_item_id:{
        type:String,
        ref:"menuItems",
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
    feedback_date:{
        type: Date,
        default: Date.now
    }
}, {
  versionKey: false
});
feeedbackSchema.virtual("feedback_id").get(function () {
  return this._id.toString();
});
const feedbackModel = mongoose.model("customerFeedback", feeedbackSchema);

export default feedbackModel;
