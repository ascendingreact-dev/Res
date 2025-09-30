import mongoose from "../db/db.js";
const inventoryMomentSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    inventory_id: {
        type: String,
        required: true,
    },
    movement_type: {
        type: String,
        enum: ["Incoming", "Outgoing"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    movement_date: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});
inventoryMomentSchema.virtual("movement_id").get(function () {
    return this._id.toString();
});
const inventoryMomentModel = mongoose.model("inventoryMoment", inventoryMomentSchema);

export default inventoryMomentModel;