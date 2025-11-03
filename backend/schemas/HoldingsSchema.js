const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    averagePrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = { HoldingsSchema };