import mongoose from "../db/db.js";

const roomCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['AC', 'NonAC', 'Garden']  
    },
    Tablename: {
        type: String,
        required: true
    },
    floor:{
        type:String, 
        required:false
    },
    TableStatus:{
        type:String,
        enum:['Blank','Running','Booked','BeforePaid'],
        required:true
    },
    status:{
        type: String,
        enum:["Active","De-Active"],
       
    },
}, { _id: false });

// Main Schema
const tablesroomsSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true
    },
    org_id: {
        type: String,
        required: true
    },
    rooms: [roomCategorySchema] 
}, { versionKey: false });

tablesroomsSchema.virtual("table_id").get(function () {
    return this._id.toString();
});

const RoomTableModel = mongoose.model("RoomTable", tablesroomsSchema);
export default RoomTableModel;
