// models/LogModel.js
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  type: { type: String, required: true },
  user: String,
  symbol: String,
  qty: Number,
  message: String,
  time: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false }, // Soft delete flag
});

module.exports = mongoose.model("Log", logSchema);