
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import {
//   Tooltip,
//   Grow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { GeneralContext } from "./GeneralContext";

// const WatchListActions = ({ uid, livePrice = 0, change = 0 }) => {
//   const { addToHoldings, addToPositions, refreshData } =
//     useContext(GeneralContext);
//   const [qty, setQty] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [pendingMode, setPendingMode] = useState(null);

//   const userId = localStorage.getItem("userId");

//   const confirmTrade = (mode) => {
//     setPendingMode(mode);
//     setOpen(true);
//   };

//   const handleTrade = async () => {
//     if (!uid || qty <= 0 || livePrice <= 0 || !userId) {
//       toast.error("Missing userId or invalid quantity/price.");
//       setOpen(false);
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3002/newOrder", {
//         userId,
//         name: uid,
//         qty,
//         price: livePrice,
//         mode: pendingMode,
//       });

//       console.log("Order response:", res.data);

//       if (pendingMode === "BUY") {
//         addToHoldings({ symbol: uid, qty, price: livePrice });
//       } else {
//         addToPositions({ symbol: uid, qty, price: livePrice });
//       }

//       toast.success(`${pendingMode} order placed successfully!`);
//       refreshData();
//     } catch (err) {
//       console.error("Order failed:", err.message);
//       toast.error("Failed to place order. Try again.");
//     } finally {
//       setOpen(false);
//     }
//   };

//   const renderActionButton = (label, mode, className) => (
//     <Tooltip
//       title={`${label} ₹${livePrice.toFixed(2)}`}
//       placement="top"
//       arrow
//       TransitionComponent={Grow}
//     >
//       <button className={className} onClick={() => confirmTrade(mode)}>
//         {label}
//       </button>
//     </Tooltip>
//   );

//   return (
//     <span className="actions">
//       <input
//         type="number"
//         value={qty}
//         onChange={(e) => setQty(Number(e.target.value))}
//         placeholder="Qty"
//         className="qty-input"
//         min={1}
//       />

//       {renderActionButton("Buy", "BUY", "buy")}
//       {renderActionButton("Sell", "SELL", "sell")}

//       <Tooltip
//         title="Analytics"
//         placement="top"
//         arrow
//         TransitionComponent={Grow}
//       >
//         <button className="action">
//           <BarChartOutlined className="icon" />
//         </button>
//       </Tooltip>

//       <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//         <button className="action">
//           <MoreHoriz className="icon" />
//         </button>
//       </Tooltip>

//       {/* ✅ Modal Confirmation */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Confirm {pendingMode} Order</DialogTitle>
//         <DialogContent>
//           Are you sure you want to {pendingMode} {qty} share
//           {qty > 1 ? "s" : ""} of <strong>{uid}</strong> @ ₹
//           {livePrice.toFixed(2)}?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button
//             onClick={handleTrade}
//             variant="contained"
//             color={pendingMode === "BUY" ? "success" : "error"}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </span>
//   );
// };

// export default WatchListActions;






// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { notifyRefreshHoldings } from "../auth/notifyRefreshHoldings";
// import {
//   Tooltip,
//   Grow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { GeneralContext } from "./GeneralContext";

// const WatchListActions = ({ uid, livePrice = 0, change = 0 }) => {
//   const { addToHoldings, addToPositions, refreshData } =
//     useContext(GeneralContext);
//   const [qty, setQty] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [pendingMode, setPendingMode] = useState(null);

//   const userId = localStorage.getItem("userId");

//   const confirmTrade = (mode) => {
//     setPendingMode(mode);
//     setOpen(true);
//   };

//   const handleTrade = async () => {
//     if (!uid || qty <= 0 || livePrice <= 0 || !userId) {
//       toast.error("Missing userId or invalid quantity/price.");
//       setOpen(false);
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3002/newOrder", {
//         userId,
//         name: uid,
//         qty,
//         price: livePrice,
//         mode: pendingMode,
//       });

//       console.log("Order response:", res.data);

//       if (pendingMode === "BUY") {
//         await addToHoldings({ symbol: uid, qty, price: livePrice });
//       } else {
//         await addToPositions({ symbol: uid, qty, price: livePrice });
//       }

//       toast.success(`${pendingMode} order placed successfully!`);
//       toast.info("Refreshing holdings..."); // ✅ Added toast here
//       await refreshData(); // ✅ Ensure refresh is awaited
//     } catch (err) {
//       console.error("Order failed:", err.message);
//       toast.error("Failed to place order. Try again.");
//     } finally {
//       setOpen(false);
//     }
//   };

//   const renderActionButton = (label, mode, className) => (
//     <Tooltip
//       title={`${label} ₹${livePrice.toFixed(2)}`}
//       placement="top"
//       arrow
//       TransitionComponent={Grow}
//     >
//       <button className={className} onClick={() => confirmTrade(mode)}>
//         {label}
//       </button>
//     </Tooltip>
//   );

//   return (
//     <span className="actions">
//       <input
//         type="number"
//         value={qty}
//         onChange={(e) => setQty(Number(e.target.value))}
//         placeholder="Qty"
//         className="qty-input"
//         min={1}
//       />

//       {renderActionButton("Buy", "BUY", "buy")}
//       {renderActionButton("Sell", "SELL", "sell")}

//       <Tooltip
//         title="Analytics"
//         placement="top"
//         arrow
//         TransitionComponent={Grow}
//       >
//         <button className="action">
//           <BarChartOutlined className="icon" />
//         </button>
//       </Tooltip>

//       <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//         <button className="action">
//           <MoreHoriz className="icon" />
//         </button>
//       </Tooltip>

//       {/* ✅ Modal Confirmation */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Confirm {pendingMode} Order</DialogTitle>
//         <DialogContent>
//           Are you sure you want to {pendingMode} {qty} share
//           {qty > 1 ? "s" : ""} of <strong>{uid}</strong> @ ₹
//           {livePrice.toFixed(2)}?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button
//             onClick={handleTrade}
//             variant="contained"
//             color={pendingMode === "BUY" ? "success" : "error"}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </span>
//   );
// };

// export default WatchListActions;









import React, { useState, useContext } from "react";
import axios from "axios";
import { notifyRefreshHoldings } from "../auth/notifyRefreshHoldings";
import {
  Tooltip,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import { toast } from "react-toastify";
import { GeneralContext } from "./GeneralContext";

const WatchListActions = ({ uid, livePrice = 0, change = 0 }) => {
  const { addToHoldings, addToPositions, refreshData, holdings } =
    useContext(GeneralContext);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);

  const userId = localStorage.getItem("userId");

  const confirmTrade = (mode) => {
    setPendingMode(mode);
    setOpen(true);
  };

  const handleTrade = async () => {
    if (!uid || qty <= 0 || livePrice <= 0 || !userId) {
      toast.error("Missing userId or invalid quantity/price.");
      setOpen(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3002/newOrder", {
        userId,
        name: uid,
        qty,
        price: livePrice,
        mode: pendingMode,
      });

      console.log("Order response:", res.data);

      if (pendingMode === "BUY") {
        await addToHoldings({ symbol: uid, qty, price: livePrice });
      } else {
        await addToPositions({ symbol: uid, qty, price: livePrice });
      }

      toast.success(`${pendingMode} order placed successfully!`);

      await notifyRefreshHoldings({
        symbol: uid,
        qty,
        refreshData,
        getHoldings: () => holdings,
      });
    } catch (err) {
      console.error("Order failed:", err.message);
      toast.error("Failed to place order. Try again.");
    } finally {
      setOpen(false);
    }
  };

  const renderActionButton = (label, mode, className) => (
    <Tooltip
      title={`${label} ₹${livePrice.toFixed(2)}`}
      placement="top"
      arrow
      TransitionComponent={Grow}
    >
      <button className={className} onClick={() => confirmTrade(mode)}>
        {label}
      </button>
    </Tooltip>
  );

  return (
    <span className="actions">
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        placeholder="Qty"
        className="qty-input"
        min={1}
      />

      {renderActionButton("Buy", "BUY", "buy")}
      {renderActionButton("Sell", "SELL", "sell")}

      <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>

      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm {pendingMode} Order</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to {pendingMode} {qty} share{qty > 1 ? "s" : ""} of <strong>{uid}</strong> @ ₹{livePrice.toFixed(2)} each?
          </p>
          <p>
            <strong>Total: ₹{(qty * livePrice).toFixed(2)}</strong>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleTrade}
            variant="contained"
            color={pendingMode === "BUY" ? "success" : "error"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default WatchListActions;