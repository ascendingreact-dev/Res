import mongoose from "../db/db.js";
const noteMasterSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      required: true,
    },
    admin_id: {
      type: String,
      required: true,
    },
    noteMaster: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
noteMasterSchema.virtual("noteMaster_id").get(function () {
  return this._id.toString();
});
const notemasterModel = mongoose.model("noteMaster", noteMasterSchema);
export default notemasterModel;
