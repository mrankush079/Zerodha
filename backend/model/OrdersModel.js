// const mongoose = require("mongoose");

// const OrdersSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     name: { type: String, required: true },
//     symbol: { type: String },
//     qty: { type: Number, required: true },
//     price: { type: Number, required: true },
//     mode: { type: String, enum: ["BUY", "SELL"], required: true },
//   },
//   { timestamps: true }
// );

// const OrdersModel = mongoose.model("Order", OrdersSchema);
// module.exports = OrdersModel;





// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   symbol: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
//   orderType: { type: String, enum: ["buy", "sell"], required: true },
//   status: { type: String, enum: ["pending", "executed", "cancelled"], default: "pending" },
//   createdAt: { type: Date }, // ✅ No index here
//   updatedAt: { type: Date }
// }, { timestamps: true });

// // ❌ Removed: orderSchema.index({ createdAt: 1 });

// module.exports = mongoose.model("Order", orderSchema);





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