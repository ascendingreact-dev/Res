import mongoose from "../db/db.js";
import menuitemModel from "./menuItemModel.js";

const userOrederSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: false,
    },
    OrderType: {
      type: String,
      enum: ["Takeaway", "Dine-In"],
      required: true,
    },
    org_id: {
      type: String,
      required: false,
    },
    table_id: {
      type: String,
      required: false,
    },
    employee_id: {
      type: String,
      required: true,
    },
    userorde_id: {
      type: String,
      required: false,
    },
    TableStatus: {
      type: String,
      enum: ["Blank", "Running", "Booked", "BeforePaid"],
      required: false,
    },
    Dishes: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        menu_item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menuItems",
          required: true,
        },
        menu_Category_id: {
          type: String,
          ref: "MenuCategory",

          required: false,
        },
        noteMaster_id: {
          type: String,
          ref: "noteMaster",
          required: false,
        },
        noteMaster: {
          type: String,
          ref: "noteMaster",
          required: false,
        },
        menuName: {
          type: String,
          required: true,
        },
        Parcel: {
          type: Boolean,
          required: false,
        },
        available: {
          type: Boolean,
          required: false,
        },

        menuImg: {
          type: String,
          required: false,
        },

        Price: {
          type: Number,
          required: true,
        },

        discount: {
          type: Number,
          required: true,
        },
        menuDiscountAmount: {
          type: Number,
          required: true,
        },

        status: {
          type: String,
          enum: ["Processing", "Foodready"],
          required: false,
        },
      },
    ],

    TotalAmount: {
      type: Number,
      required: true,
    },
    SGST: {
      type: Number,
      required: true,
    },
    CGST: {
      type: Number,
      required: true,
    },
    GSTAmount: {
      type: Number,
      required: true,
    },
    TableName: {
      type: String,
      required: false,
    },
    KOT_No: {
      type: String,
      required: true,
    },
    Bill_No: {
      type: String,
      required: true,
    },
    old_Kot_no: {
      type: String,
      required: false,
    },
    TableType: {
      type: String,
      enum: ["AC", "NonAC", "Garden"],
      required: false,
    },
    DiscountAmount: {
      type: Number,
      required: true,
    },
    SubTotal: {
      type: Number,
      required: true, 
    },
    totalAmountWithGst: {
      type: Number,
      required: true,
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

userOrederSchema.virtual("userorder_id").get(function () {
  return this._id.toString();
});

const userOrderModel = mongoose.model("userOreders", userOrederSchema);
export default userOrderModel;

/* import mongoose from "../db/db.js";
import menuitemModel from "./menuItemModel.js";

const userOrederSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:false
    },
    OrderType :{
        type:String,
        enum:["Takeaway","Dine-In"],
        required:true
    },
    org_id:{
        type:String,
        required:false
    },
    table_id: {
        type: String,
        required: false
    },
    employee_id: {
        type: String,
        required: true
    },
    userorde_id:{
        type: String,
        required: false
    },
    TableStatus: {
        type: String,
        enum: ['Blank', 'Running', 'Booked', 'BeforePaid'],
        required: false
    },
    Dishes: [{
        quantity: {
            type: Number, default: 1,
        },
        menu_item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "menuItems",
            required: true
        },
        menu_Category_id: { 
            type: String,
            ref:"MenuCategory",
            
            required: false
        },
        noteMaster_id:{
            type: String,
            ref:"noteMaster",
            required: false
        },
        noteMaster:{
            type: String,
            ref:"noteMaster",
            required: false
        },
        menuName: {
            type: String,
            required: true
        },
        Parcel: {
            type: Boolean,
            required: false
        },
        available: {
            type: Boolean,
            required: false
        },


        menuImg: {
            type: String,
            required: false
        },
       
    
        Price: {
            type: Number,
            required: true
        },
       
        status:{
            type: String,
            enum: ['Processing','Foodready'],
            required: false  
        }
    }],
    
    TotalAmount:{
        type: Number,
        required: true
    },
    SGST:{
        type: Number,
        required: true
    },
    CGST:{
        type: Number,
        required: true
    },
    GSTAmount:{
        type: Number,
        required: true
    },
    TableName: {
        type: String,
        required: false
    },
    KOT_No: {
        type: String,
        required: true
    },
    Bill_No:{
        type: String,
        required: true
    },
    old_Kot_no:{
        type: String,
        required: false
    },
    TableType: {
        type: String,
        enum: ['AC', 'NonAC', 'Garden'],
        required: false
    },
    SubTotal:{
        type: Number,
        required: true
    },
    DiscountAmount:{
        type: Number,
        required: true
    },
    totalAmountWithGst:{
        type: Number,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

},

    {
        versionKey: false
    });

userOrederSchema.virtual("userorder_id").get(function () {
    return this._id.toString();
});

const userOrderModel = mongoose.model("userOreders", userOrederSchema);
export default userOrderModel; */
