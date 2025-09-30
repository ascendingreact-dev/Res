import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
    {
        admin_id: {
            type: String,
            required: false, 
        },
        org_id: {
            type: String,
            required: false, 
        },
        Category: {
            type: String,
            required: true, 
        },
        CategoryIcon: {
            type: String,
            required: false, 
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);
menuCategorySchema.virtual("menu_Category_id").get(function () {
    return this._id.toString();
});

const menuCategoryModel = mongoose.model("MenuCategory", menuCategorySchema); 

export default menuCategoryModel;
