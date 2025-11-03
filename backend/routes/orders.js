
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const OrdersModel = require("../model/OrdersModel");

// ✅ Validation schema
const orderSchema = Joi.object({
  name: Joi.string().required(),
  symbol: Joi.string().optional(), // Optional with fallback
  qty: Joi.number().min(1).required(),
  price: Joi.number().min(1).required(),
  mode: Joi.string().valid("BUY", "SELL").required(),
  userId: Joi.string().required()
});

// ✅ POST /orders
router.post("/", async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, symbol = name, qty, price, mode, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const newOrder = new OrdersModel({
      name,
      symbol,
      qty,
      price,
      mode,
      userId
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    console.error("Order save error:", err.message);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ GET /orders/user/:userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const orders = await OrdersModel.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("User orders fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ GET /orders/all (Admin view)
router.get("/all", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Admin orders fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
});

module.exports = router;