const HoldingsModel = require("../model/HoldingsModel");

async function updateHoldings({ userId, symbol, qty, price, mode }) {
  const existing = await HoldingsModel.findOne({ userId, symbol });

  if (mode === "BUY") {
    if (existing) {
      const totalQty = existing.qty + qty;
      const newAvg = ((existing.avg * existing.qty) + (price * qty)) / totalQty;

      existing.qty = totalQty;
      existing.avg = newAvg;
      existing.price = price;
      await existing.save();
    } else {
      await HoldingsModel.create({
        userId,
        symbol,
        name: symbol,
        qty,
        avg: price,
        price
      });
    }
  }

  if (mode === "SELL" && existing) {
    existing.qty = Math.max(existing.qty - qty, 0);
    await existing.save();
  }
}

module.exports = updateHoldings;