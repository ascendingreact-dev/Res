import mongoose from "../db/db.js";
const supplierSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true
    },
    org_id:{
        type:String,
        required:true
    },
    supplier_name: {
        type: String,
        required: true,
    },
    contact_information: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        district: {
            type: String
        },
        zipCode: {
            type: Number
        },
    },

   
    timestamp: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});
supplierSchema.virtual("supplier_id").get(function () {
    return this._id.toString();
});
const supplierModel = mongoose.model("supplier", supplierSchema);

export default supplierModel;