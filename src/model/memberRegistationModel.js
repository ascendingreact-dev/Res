import mongoose from "mongoose";
const memberSchma=new mongoose.Schema(
{
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    Member_id:{
        type:String,
        required:true
    },
    MemberName:{
        type:String,
        required:true
    },
    CardNo:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    ContactNo:{
        type:Number,
        required:true
    },
    RegisterdDate:{
        type: Date,
        default: Date.now
    },
    Status:{
        type:String,
        enum:['Active','Deactive'],
        required:true
    }
},
{
    versionKey:false
}
);
memberSchma.virtual("member_id").get(function () {
    return this._id.toString();
  });
const memberRegistationModel=mongoose.model("member",memberSchma);


export default memberRegistationModel;