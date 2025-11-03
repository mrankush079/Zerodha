

const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String
    },
    qty: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      enum: ["buy", "sell"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "executed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true } // ✅ Automatically adds createdAt and updatedAt
);

// ✅ No manual index on createdAt — avoids duplicate warning

module.exports = mongoose.model("Order", OrdersSchema);