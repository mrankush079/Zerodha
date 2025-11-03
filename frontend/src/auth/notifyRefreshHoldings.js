import { toast } from "react-toastify";

/**
 * Compares holdings before and after to confirm update
 */
const didHoldingsUpdate = (prev, updated, symbol, qty) => {
  const prevQty = prev.find(s => s.symbol === symbol)?.qty || 0;
  const newQty = updated.find(s => s.symbol === symbol)?.qty || 0;
  return newQty > prevQty || (prevQty === 0 && newQty === qty);
};

/**
 * Refresh holdings with notification, spinner, and retry logic
 */
export const notifyRefreshHoldings = async ({
  symbol,
  qty,
  refreshData,
  getHoldings,
  maxRetries = 2,
}) => {
  toast.info("Refreshing holdings...");

  let attempt = 0;
  let success = false;

  const previous = getHoldings();

  while (attempt <= maxRetries && !success) {
    try {
      await refreshData();
      const updated = getHoldings();

      if (didHoldingsUpdate(previous, updated, symbol, qty)) {
        toast.success("Holdings updated successfully!");
        success = true;
      } else {
        attempt++;
        if (attempt <= maxRetries) {
          console.warn(`Retrying refresh (${attempt}/${maxRetries})...`);
        }
      }
    } catch (err) {
      console.error("Refresh failed:", err.message);
      toast.error("Failed to refresh holdings.");
      break;
    }
  }

  if (!success) {
    toast.error("Trade placed, but holdings did not update.");
  }
};