import mongoose from "mongoose";
const paymentSchma=new mongoose.Schema(
    {
        admin_id:{
            type:String,
            required:false
        },
        org_id:{
            type:String,
            required:false
        },
        order_id:{
            type:String,
            required:true
        },
        payment_amount:{
            type:Number,
            required:true
        },
        payment_status:{
            type:String,
            required:true
        },
        payment_date:{
            type: Date, 
            default: Date.now 
        }
    },
{versionKey:false}
);
paymentSchma.virtual("payment_id").get(function () {
    return this._id.toString();
  });
const paymentModel=mongoose.model("payments",paymentSchma);


export default paymentModel;