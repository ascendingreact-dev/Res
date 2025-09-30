import mongoose from "mongoose";
const loyaltyProgramsSchma=new mongoose.Schema(
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
    reward_points:{
        type:String,
        required:true
    },
    last_updated:{
        type:String,
        required:true
    }
},
{versionKey:false}
);
loyaltyProgramsSchma.virtual("loyalty_program_id").get(function () {
    return this._id.toString();
  });
const loyaltyProgramsModel=mongoose.model("loyaltyPrograms",loyaltyProgramsSchma);


export default loyaltyProgramsModel;