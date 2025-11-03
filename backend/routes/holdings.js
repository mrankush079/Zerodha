
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const HoldingsModel = require("../model/HoldingsModel");
const staticQuotes = require("../data/staticQuotes.json");

// Utility: validate required fields
const validateFields = (fields) => {
  return fields.every((field) => field !== undefined && field !== null);
};

// ✅ Create or update a holding (buy/sell)
router.post("/", async (req, res) => {
  const { userId, symbol, qty, price, type = "buy" } = req.body;

  if (!validateFields([userId, symbol, qty, price])) {
    return res.status(400).json({ error: "Missing required fields", status: "error" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.status(400).json({ error: "Invalid userId", status: "error" });
  }

  try {
    const existing = await HoldingsModel.findOne({ userId, symbol });

    if (existing) {
      if (type === "sell") {
        if (existing.qty < qty) {
          return res.status(400).json({ error: "Not enough quantity to sell", status: "error" });
        }
        existing.qty -= qty;
      } else {
        const totalCost = existing.price * existing.qty + price * qty;
        existing.qty += qty;
        existing.price = totalCost / existing.qty;
      }

      await existing.save();
      return res.status(200).json({
        message: "Holdings updated",
        holding: existing,
        status: "success",
      });
    }

    if (type === "sell") {
      return res.status(400).json({ error: "Cannot sell non-existent holding", status: "error" });
    }

    const newHolding = new HoldingsModel({ userId, symbol, qty, price });
    await newHolding.save();

    res.status(201).json({
      message: "Holdings created",
      holding: newHolding,
      status: "success",
    });
  } catch (err) {
    console.error("Holdings POST error:", err.message);
    res.status(500).json({ error: "Failed to update holdings", status: "error" });
  }
});

// ✅ Get holdings for a specific user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.status(400).json({ error: "Invalid userId", status: "error" });
  }

  try {
    const holdings = await HoldingsModel.find({ userId });

    const enriched = holdings.map((h) => {
      const quote = staticQuotes[h.symbol.toUpperCase()] || {};
      const ltp = quote.price || 0;
      const change = quote.change || 0;

      const curVal = ltp * h.qty;
      const pnl = (ltp - h.price) * h.qty;
      const dayChg = change * h.qty;

      return {
        ...h.toObject(),
        price: ltp,
        change,
        curVal,
        pnl,
        dayChg
      };
    });

    res.status(200).json(enriched);
  } catch (err) {
    console.error("User holdings fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch holdings", status: "error" });
  }
});

// ✅ Get all holdings (admin or demo)
router.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});

    const enriched = holdings.map((h) => {
      const quote = staticQuotes[h.symbol.toUpperCase()] || {};
      const ltp = quote.price || 0;
      const change = quote.change || 0;

      const curVal = ltp * h.qty;
      const pnl = (ltp - h.price) * h.qty;
      const dayChg = change * h.qty;

      return {
        ...h.toObject(),
        price: ltp,
        change,
        curVal,
        pnl,
        dayChg
      };
    });

    res.status(200).json(enriched);
  } catch (err) {
    console.error("All holdings fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch all holdings", status: "error" });
  }
});

module.exports = router;
