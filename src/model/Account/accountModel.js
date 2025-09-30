// import mongoose from "../../db/db.js";

// const AccountSchema = new mongoose.Schema({
//     bill_no: {
//         type: String,
//         required: false,
//     },
//     table_no: {
//         type: String,
//         required: false,
//     },
//     date: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: String,
//         required: true,
//     },
//     // customerName: {
//     //     type: String,
//     //     required: true,
//     // },
//     phoneNumber: {
//         type: String,
//         required: true,
//     },
//     table_id: {
//         type: String,
//         required: true,
//     },
//     Admin_id: {
//         type: String,
//         required: true,
//     },
//     org_id: {
//         type: String,
//         required: true,
//     },
//     paymentMode: {
//         type: String,
//         required: true,
//     },
//     amount: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     discount: {
//         type: Number,
//         required: false, // Optional, can adjust to true if required
//     },
//     amountReceived: {
//         type: Number,
//         required: true,
//     },
//     change: {
//         type: Number,
//         required: false, // Optional if change is 0 when exact payment
//     },
//     parcelCharge: {
//         type: Number,
//         required: false, // Optional, can default to 0 if no parcel charge
//     },
//     subTotal: {
//         type: Number,
//         required: true,
//     },
//     grandTotal: {
//         type: Number,
//         required: true,
//     },
//     phoneNumber: {
//         type: Number,
//         required: true,
//     },
//     timestamp: {
//         type: Date,
//         default: Date.now,
//     },
// }, {
//     versionKey: false,
// });

// AccountSchema.virtual("category_id").get(function () {
//     return this._id.toString();
// });

// const accountModel = mongoose.model("Account", AccountSchema);

// export default accountModel;





import mongoose from "../../db/db.js";

const AccountSchema = new mongoose.Schema({
    userOrder_id:{
        type: String,
        ref:"userorder",
        required: true,
    },
    Bill_No: {
        type: String,
        required: false,
    },
      
    date: {
        type: String,
        required: false,
    },   
    time: {
        type: String,
        required: false,
    },
    customerName: {
        type: String,
        required: false,
    },
    ContactNo: {
        type: String,
        required: false,
    },
    table_id: {
        type: String,
        required: false,
    },
    admin_id: {
        type: String,
        required: false,
    },
    org_id: {
        type: String,
        required: false,
    },
    paymentMode: {
        type: String,
        enum:['cash','online','debitCard','creditCard'],
        required: false,
    },
    amount: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    discount: {
        type: Number,
        required: false, // Optional, can adjust to true if required
    },
    amountReceived: {
        type: Number,
        required: false,
    },
    change: {
        type: Number,
        required: false, // Optional if change is 0 when exact payment
    },
    parcelCharge: {
        type: Number,
        required: false, // Optional, can default to 0 if no parcel charge
    },
    subTotal: {
        type: Number,
        required: false,
    },
    TotalAmount: {
        type: Number,
        required: false,
    },
    table_no: {
        type: String,
        required: false,
    },
    cash:{
        type: Number,
        required: false,
    },
    bill_status:{
        type:String,
        enum:["tables","single"],
        required:false
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    
}, {
    versionKey: false,
});

AccountSchema.virtual("bill_id").get(function () {
    return this._id.toString();
});
AccountSchema.index({ date: 1 });

const accountModel = mongoose.model("Account", AccountSchema);

export default accountModel;