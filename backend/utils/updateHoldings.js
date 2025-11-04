const HoldingsModel = require("../model/HoldingsModel");

async function updateHoldings({ userId, symbol, qty, price, mode }) {
  const action = mode?.toLowerCase();

  if (!userId || !symbol || !qty || !price || !["buy", "sell"].includes(action)) {
    console.warn(" Invalid updateHoldings input:", { userId, symbol, qty, price, mode });
    return;
  }

  try {
    const existing = await HoldingsModel.findOne({ userId, symbol });

    if (action === "buy") {
      if (existing) {
        const totalQty = existing.qty + qty;
        const newAvg = ((existing.avg || existing.price) * existing.qty + price * qty) / totalQty;

        existing.qty = totalQty;
        existing.avg = newAvg;
        existing.price = price;
        await existing.save();
        console.log(` Updated holding for ${symbol}:`, existing);
      } else {
        const newHolding = await HoldingsModel.create({
          userId,
          symbol,
          name: symbol,
          qty,
          avg: price,
          price
        });
        console.log(` Created new holding for ${symbol}:`, newHolding);
      }
    }

    if (action === "sell") {
      if (!existing) {
        console.warn(` Cannot sell non-existent holding for ${symbol}`);
        return;
      }

      existing.qty = Math.max(existing.qty - qty, 0);
      await existing.save();
      console.log(` Sold ${qty} of ${symbol}, remaining qty: ${existing.qty}`);
    }

    //  Optional: log all holdings after update
    const allHoldings = await HoldingsModel.find({ userId });
    console.log(" Holdings after update:", allHoldings);
  } catch (err) {
    console.error(" updateHoldings error:", err.message);
  }
}

module.exports = updateHoldings;