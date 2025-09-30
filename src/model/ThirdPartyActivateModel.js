import mongoose from "mongoose";
const activeSchma = new mongoose.Schema(
    {
        admin_id: {
            type: String,
            required: false
        },
        org_id: {
            type: String,
            required: false
        },
        tie_up: {
            type: String,
            enum:["Yes","No"],
            required: true,
        },
        Vendor_code: {
            type: Number,
            required: true,
        },
        contact_NO: {
            type: Number,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Add_Gst: {
            type: String,
            enum:["Yes","No"],
            required: true,
        },
        packing_charge: {
            type: String,
            enum:["Yes","No"],
            required: true,
        },
        no_of_order_perday: {
            type: Number,
            required: true,
        },
        upload_menu: {
            type: String,
            required: false,
        },
        queries: {
            type: Boolean,
           
            required: true,
        },
       
        timestramp: {
            type: Date,
            default: Date.now
        },
      
      
    },
    { versionKey: false }
);
activeSchma.virtual("activate_id").get(function () {
    return this._id.toString();
});
const ThiedPartyActiveModel = mongoose.model("activateThiedParty ", activeSchma);


export default ThiedPartyActiveModel;