import mongoose from "../db/db.js";
const orgSchema = new mongoose.Schema({


    category_id: {
        type: String,
        ref: "category",
        required: true,
    },
    admin_id: {
        type: String,
        ref: "register",
        required: false,
    },
     plan_id: {
      type: String,
      ref: "plan",
      required: true,
    },

    validto: {
      type: Date,
      required: true, 
    },
    // isPlanExpired: { type: Boolean, default: false },
    Gst: {
        NonAC: {
            type: String,
            required: false,
        },
        AC: {
            type: String,
            required: false,
        }
        ,
        Garden: {
            type: String,
            required: false,
        }
    },
    KOT_No:{
        type: String,
        required: false,  
    },
    Bill_No:{
        type: String,
        required: false,  
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});
orgSchema.virtual("org_id").get(function () {
    return this._id.toString();
});
const organizationModel = mongoose.model("organization", orgSchema);

export default organizationModel;