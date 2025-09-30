import mongoose from "../db/db.js";
const specialOfferSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    offer_name:{
        type:String,
        required:true
    },
    offer_description:{
        type:String,
        required:true
    },
    discount_percentage:{
        type:String,
        required:true
    },
    start_date:{
        type: Date,
        default: Date.now
    },
    end_date:{
        type: Date,
        default: Date.now
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        required:true
    }
  
}, {
  versionKey: false
});
specialOfferSchema.virtual("offer_id").get(function () {
  return this._id.toString();
});
const specialOffersModel = mongoose.model("specialOffers", specialOfferSchema);

export default specialOffersModel;