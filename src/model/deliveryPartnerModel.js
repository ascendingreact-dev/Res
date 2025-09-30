import mongoose from "../db/db.js";
const deliverySchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    activate_id:{
        type:String,
        required:false
    },
    AppLink:{
        type:String,
        required:true
    },
    AppName:{
        type:String,
        required:true
    },
    AppIcon:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },

    KeyFeatures:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
}, {
  versionKey: false
});
deliverySchema.virtual("deliveryPartner_id").get(function () {
  return this._id.toString();
});
const deliveryPartnerModel = mongoose.model("deliveryPartner", deliverySchema);

export default deliveryPartnerModel;
