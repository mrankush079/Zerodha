
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const OrdersModel = require("../model/OrdersModel");
const updateHoldings = require("../utils/updateHoldings"); //  Holdings updater

//  Validation schema (symbol is optional)
const orderSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  symbol: Joi.string().optional(), //  Optional with fallback
  qty: Joi.number().min(1).required(),
  price: Joi.number().min(1).required(),
  mode: Joi.string().valid("BUY", "SELL").required() //  Accepts uppercase input
});

//  POST /newOrder
router.post("/", async (req, res) => {
  console.log(" Incoming request body:", req.body);

  const { error } = orderSchema.validate(req.body);
  if (error) {
    console.error(" Validation error:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { userId, name, symbol = name, qty, price, mode } = req.body;

  //  Validate userId as a proper ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error(" Invalid userId:", userId);
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    //  Normalize mode to lowercase for Mongoose enum
    const normalizedMode = mode.toLowerCase(); // "BUY" → "buy"

    //  Save order
    const newOrder = await OrdersModel.create({
      userId,
      name,
      symbol,
      qty,
      price,
      mode: normalizedMode,
      status: "pending"
    });

    console.log(" Order saved:", newOrder);

    //  Update holdings
    await updateHoldings({ userId, symbol, qty, price, mode: normalizedMode });
    console.log(" Holdings updated for:", userId);

    res.status(201).json({
      message: `${mode} order for ${symbol} received`,
      order: newOrder,
      status: "success"
    });
  } catch (err) {
    console.error(" Order save error:", err.message);
    res.status(500).json({ error: "Failed to save order", status: "error" });
  }
});

module.exports = router;