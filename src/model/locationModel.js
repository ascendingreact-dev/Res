import mongoose from "../db/db.js";
const locationSchema = new mongoose.Schema({
  admin_id:{
    type:String,
    required:true
  },
  org_id:{
    type:String,
    required:true
  },
  location_name: {
    type: String,
    required: true,
  },
  address: {
    street: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    zipCode: {
        type: Number,
        required: false,
    },
},
timestamp: {
  type: Date,
  default: Date.now
},
 
}, {
  versionKey: false
});
locationSchema.virtual("location_id").get(function () {
  return this._id.toString();
});
const locationModel = mongoose.model("location", locationSchema);

export default locationModel;