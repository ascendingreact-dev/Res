import mongoose from "../db/db.js";
const logoSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    mainCategory_id: {
      type: String,
      ref:"mainCategory",
      required: true,
    },
    appLogo: {
      type: String,
      allownul: false,
    },
    sub_Category: {
        type: String,
        required: true,
      },
 
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
logoSchema.virtual("applogo_id").get(function () {
  return this._id.toString();
});
const applogoModel = mongoose.model("applogos", logoSchema);

export default applogoModel;
