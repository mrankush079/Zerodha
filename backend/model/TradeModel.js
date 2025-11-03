// backend/model/TradeModel.js
const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  user: { type: String, required: true },
  symbol: { type: String, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  time: { type: Date, default: Date.now },
  status: { type: String, enum: ["executed", "pending", "cancelled"], default: "executed" },
  orderId: { type: String },
  type: { type: String, enum: ["market", "limit"], default: "market" }
});

module.exports = mongoose.model("Trade", tradeSchema);