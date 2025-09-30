import mongoose from "../db/db.js";
const reservationSchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      required:false
    },
    org_id:{
      type:String,
      required:false
    },
    customer_id:{
        type:String,
        required:true
    },
    table_id:{
        type:String,
        required:true
    },
    reservation_date:{
        type: Date, 
        default: Date.now
    },
    reservation_time:{
        type:String,
        required:true
    },
    
  },
  { versionKey: false }
);
reservationSchema.virtual("reservation_id").get(function () {
  return this._id.toString();
});
const reservationModel = mongoose.model("reservations", reservationSchema);

export default reservationModel;