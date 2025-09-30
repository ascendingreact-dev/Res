import mongoose from "mongoose";
const iconSchma=new mongoose.Schema(
{
    admin_id:{
        type:String,
        required:false
    },
    org_id:{
        type:String,
        required:false
    },
    iconName:{
        type:String,
        required:true
    },
    iconImage:{
        type:String,
        required:true
    },
},
{
    versionKey:false
}
);
iconSchma.virtual("icon_id").get(function () {
    return this._id.toString();
  });
const iconModel=mongoose.model("icon",iconSchma);


export default iconModel;