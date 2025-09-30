import mongoose from "../db/db.js";

const planSchema = new mongoose.Schema(
  {
    //user_count
    userCount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["days", "months", "years"],
        required: true,
      },
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

// Optional virtual ID
planSchema.virtual("plan_id").get(function () {
  return this._id.toString();
});

const planModel = mongoose.model("plan", planSchema);
export default planModel;

/* import mongoose from "../db/db.js";

const planSchema = new mongoose.Schema(
  {
    appaccess: [
      {
        app_name: {
          type: String,
          required: true,
        },
        user_count: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["days", "months", "years"], 
        required: true,
      },
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

// Optional virtual ID
planSchema.virtual("plan_id").get(function () {
  return this._id.toString();
});

const planModel = mongoose.model("plan", planSchema);
export default planModel;
 */
