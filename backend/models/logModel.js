const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    temperature: {
      type: Number,
      required: [true, "Please add your current body temperature"],
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    symptoms: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);
