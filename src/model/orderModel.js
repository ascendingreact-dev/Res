import mongoose from "mongoose";
const orderSchma = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: false,
    },
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: false,
    },
    orderFrom: {
      type: String,
      required: false,
    },
    orderLogo: {
      type: String,
      required: false,
    },
    Hotel_Name: {
      type: String,
      required: true,
    },
    Hotel_Phn_no: {
      type: String,
      required: true,
    },
    cust_Name: {
      type: String,
      required: true,
    },
    cust_phn_no: {
      type: String,
      required: true,
    },

    OTP: {
      type: String,
      required: true,
    },

    Address: {
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    order_status: {
      type: String,
      required: true,
      enum: ["newOrder", "Confirmed", "Cancelled", "Completed"],
    },
    ReasonTo_reject: {
      type: String,
      required: false,
    },
    payment_method: {
      type: String,
      required: false,
      enum: ["Cash", "Credit Card", "Mobile Payment"],
    },

    delivery_Person: {
      Name: {
        type: String,
        required: true,
      },
      phn_no: {
        type: Number,
        required: true,
      },
      ID: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },

    menu: [
      {
        menu_name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        discount: {
          type: String,
          required: true,
        },
        Unit_price: {
          type: Number,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        Total_amount: {
          type: String,
          required: true,
        },
        Tax: {
          type: String,
          required: true,
        },
        Food_pre_time: {
          type: String,
          required: true,
        },
      },
    ],
    timestramp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
orderSchma.virtual("Onlin_order_id").get(function () {
  return this._id.toString();
});
const orderModel = mongoose.model("onlineorder", orderSchma);

export default orderModel;
