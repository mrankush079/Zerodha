const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const response = await axios.get(`https://nse-api-khaki.vercel.app:5000/quote/${symbol}`);
    res.json(response.data);
  } catch (error) {
    console.error("NSE API error:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

module.exports = router;