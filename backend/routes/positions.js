const express = require("express");
const router = express.Router();
const PositionsModel = require("../model/PositionsModel");

router.post("/", async (req, res) => {
  const { userId, symbol, qty, price } = req.body;

  if (!userId || !symbol || !qty || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await PositionsModel.findOne({ userId, symbol });

    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.status(200).json({ message: "Position updated", position: existing });
    }

    const newPosition = new PositionsModel({ userId, symbol, qty, price });
    await newPosition.save();
    res.status(201).json({ message: "Position created", position: newPosition });
  } catch (err) {
    res.status(500).json({ error: "Failed to update position" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const positions = await PositionsModel.find({ userId: req.params.userId });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

module.exports = router;