const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const HoldingsModel = mongoose.model("Holding", HoldingsSchema);
module.exports = HoldingsModel;


