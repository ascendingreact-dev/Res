import mongoose from "../db/db.js";
const productEntrySchema = new mongoose.Schema({
    
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    ProductName:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Unit:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    StorageType:{
        type:String,
        required:true
    },
    Kitchen:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    ExpiryDate:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    ReorderPoint:{
        type:String,
        required:true
    },
    ProductCode:{
        type:String,
        required:true
    }
}, {
    versionKey: false
});
productEntrySchema.virtual("ProductEntry_id").get(function () {
    return this._id.toString();
});
const productEntryModel = mongoose.model("ProductEntry", productEntrySchema);
export default productEntryModel;