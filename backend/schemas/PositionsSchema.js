const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema(
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
    entryPrice: {
      type: Number,
      required: true
    },
    exitPrice: {
      type: Number
    },
    quantity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    }
  },
  { timestamps: true }
);

module.exports = { PositionsSchema };