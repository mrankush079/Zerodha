const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["stock", "crypto", "etf", "commodity"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = { WatchlistSchema };