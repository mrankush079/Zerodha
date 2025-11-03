const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const PositionsModel = mongoose.model("Position", PositionsSchema);
module.exports = PositionsModel;


