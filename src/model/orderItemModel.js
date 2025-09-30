import mongoose from "mongoose";
const orderItemSchma=new mongoose.Schema(
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
    product_id:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},
{versionKey:false}
);
orderItemSchma.virtual("order_item_id").get(function () {
    return this._id.toString();
  });
const orderItemModel=mongoose.model("orderItem",orderItemSchma);


export default orderItemModel;