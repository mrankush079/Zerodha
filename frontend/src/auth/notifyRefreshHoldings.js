

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
  delayMs = 500,
  setLoading = null,
}) => {
  toast.info("🔄 Refreshing holdings...");

  if (setLoading) setLoading(true);

  let attempt = 0;
  let success = false;

  const previous = getHoldings() || [];

  while (attempt <= maxRetries && !success) {
    try {
      await refreshData();
      const updated = getHoldings() || [];

      console.log(" Previous holdings:", previous);
      console.log(" Updated holdings:", updated);

      if (didHoldingsUpdate(previous, updated, symbol, qty)) {
        toast.success(" Holdings updated successfully!");
        success = true;
      } else {
        attempt++;
        if (attempt <= maxRetries) {
          console.warn(` Retry ${attempt}/${maxRetries}...`);
          await new Promise(res => setTimeout(res, delayMs));
        }
      }
    } catch (err) {
      console.error(" Refresh failed:", err.message);
      toast.error("Failed to refresh holdings.");
      break;
    }
  }

  if (!success) {
    toast.error(" Trade placed, but holdings did not update.");
  }

  if (setLoading) setLoading(false);
};