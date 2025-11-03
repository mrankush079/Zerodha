const express = require("express");
const router = express.Router();
const staticQuotes = require("../data/staticQuotes.json");

router.get("/:symbol", (req, res) => {
  const rawSymbol = req.params.symbol.toUpperCase();
  const symbol = rawSymbol.replace("&", "AND"); // sanitize M&M

  if (staticQuotes[symbol]) {
    return res.json({
      source: "static",
      symbol,
      ...staticQuotes[symbol],
      status: "success",
    });
  }

  res.status(404).json({
    symbol,
    error: "Quote not found in static data",
    status: "error",
  });
});

module.exports = router;