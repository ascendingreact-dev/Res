import mongoose from "../db/db.js";
const discountSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true
    },
    org_id:{
        type:String,
        required:true
    },
    dicount_code:{
        type:Number,
        required:true
    },
    discountAmount:{
        type:String,
        required:true
    },
    discount_category:[{
        type:String,
        default:null,
        required:true
    }],
    dis_main_Category:{
        type:String,
        required:true
    },
    validFrom:{
        type:Date,
        required:true
    },
    validTo:{
        type:Date,
        required:true
    },

    isActive:{
        type:Boolean,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
}, {
  versionKey: false
});
discountSchema.virtual("discount_id").get(function () {
  return this._id.toString();
});
const discountModel = mongoose.model("discount", discountSchema);

export default discountModel;
