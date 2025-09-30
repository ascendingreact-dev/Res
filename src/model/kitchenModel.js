import mongoose from "../db/db.js";
const kitchenSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    TableName:{
        type:String,
        required:true
    },
    CategoryName:{
        type:String,
        required:true
    },
    kotNo:{
        type:Number,
        required:true
    },
    DateTime:{
        type: Date,
        default: Date.now
    },
    ProductCount:{
        type:Number,
        required:true
    },
    Paytime:{
        type: Date,
        default: Date.now
    }
   
}, {
    versionKey: false
});
kitchenSchema.virtual("kitchen_id").get(function () {
    return this._id.toString();
});
const kitchenModel = mongoose.model("kitchen", kitchenSchema);

export default kitchenModel;