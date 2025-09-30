import mongoose from "../db/db.js";

const gstSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    ProductCatagory: {
        type:String,
        ref:'Product',
        required:true
    },
    gst: {
        type:Number,
        required:true
    },
    ServiceCharges: {
        type:Number,
        required:true
    }
}, {
    versionKey:false
});

gstSchema.virtual("gst_id").get(function () {
    return this._id.toString();
});

const gstModel = mongoose.model("GST",gstSchema);

export default gstModel;

