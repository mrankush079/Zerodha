const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["stock", "crypto", "etf", "commodity"], required: true },
  },
  { timestamps: true }
);

const WatchlistModel = mongoose.model("Watchlist", watchlistSchema);
module.exports = WatchlistModel;
