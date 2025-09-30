import mongoose from "mongoose";
const customerSchma=new mongoose.Schema(
   {
    admin_id:{
        type:String,
        required:true
    },
    org_id:{
        type:String,
        required:true
    },
    CustomerId:{
        type:Number,
        required:false
    },
    CustomerName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:false
    },
    cust_status:{
        type:String,
        enum:["New","Old"],
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    DateOfBirth:{
        type:String,
        required:false
    },
    EmailId:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    Date:{
        type: Date,
        default: Date.now
    }
},
{ versionKey: false }
);
customerSchma.virtual("customer_id").get(function () {
    return this._id.toString();
  });
const customerModel=mongoose.model("customers",customerSchma);


export default customerModel;