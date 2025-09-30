import mongoose from "../db/db.js";

const tableSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    table_number: {
      type: Number,
      required: true, // Corrected 'require' to 'required'
    },
    seating_capacity: {
      type: String,
      required: true, // Corrected 'require' to 'required'
    },
    status: {
      type: String,
      required: true, // Corrected 'require' to 'required'
      enum: ['Available', 'Reserved', 'Occupied'], // Enum values are correctly set
    },
    location: {
      type: String,
      required: true, // Corrected 'require' to 'required'
    },
  },
  { versionKey: false }
);

tableSchema.virtual("tables_id").get(function () {
  return this._id.toString();
});

const TablesModel = mongoose.model("table", tableSchema);

export default TablesModel;
