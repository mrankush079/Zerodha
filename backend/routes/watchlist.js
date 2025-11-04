const express = require("express");
const router = express.Router();
const WatchlistModel = require("../model/WatchlistModel"); //  Corrected path

//  Get watchlist for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const watchlist = await WatchlistModel.find({ userId: req.params.userId });
    res.status(200).json(watchlist);
  } catch (err) {
    console.error("Watchlist fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch watchlist", status: "error" });
  }
});

//  Add to watchlist
router.post("/", async (req, res) => {
  const { userId, symbol, name, type, note = "", alertPrice = null } = req.body;

  if (!userId || !symbol || !name || !type) {
    return res.status(400).json({ error: "Missing required fields", status: "error" });
  }

  try {
    const existing = await WatchlistModel.findOne({ userId, symbol });
    if (existing) {
      return res.status(409).json({ error: "Already in watchlist", status: "error" });
    }

    const newItem = new WatchlistModel({
      userId,
      symbol: symbol.toUpperCase().trim(),
      name,
      type,
      note,
      alertPrice
    });

    await newItem.save();
    res.status(201).json({ message: "Added to watchlist", item: newItem, status: "success" });
  } catch (err) {
    console.error("Watchlist add error:", err.message);
    res.status(500).json({ error: "Failed to add to watchlist", status: "error" });
  }
});

//  Remove from watchlist
router.delete("/:itemId", async (req, res) => {
  try {
    const item = await WatchlistModel.findByIdAndDelete(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found", status: "error" });
    }
    res.status(200).json({ message: "Removed from watchlist", status: "success" });
  } catch (err) {
    console.error("Watchlist delete error:", err.message);
    res.status(500).json({ error: "Failed to remove item", status: "error" });
  }
});

module.exports = router;