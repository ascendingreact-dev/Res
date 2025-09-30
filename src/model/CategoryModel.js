import mongoose from "../db/db.js";
const CategorySchema = new mongoose.Schema(
  {
    admin_id:{
      type:String,
      require:false
    },
    org_id:{
      type:String,
      require:false
    },
    category_name:{
        type:String,
        require:true
    },
    category_description:{
        type:String,
        require:true
    },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
CategorySchema.virtual("category_id").get(function () {
  return this._id.toString();
});
const CategoryModel = mongoose.model("categories", CategorySchema);

export default CategoryModel;