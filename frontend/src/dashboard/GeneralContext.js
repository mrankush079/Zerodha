// import React, { useState, useEffect, useCallback, createContext } from "react";
// import axios from "axios";

// export const GeneralContext = createContext({
//   refreshData: () => {},
//   refreshTrigger: 0,
//   addToHoldings: () => {},
//   addToPositions: () => {},
//   holdings: [],
//   positions: [],
// });

// export const GeneralContextProvider = ({ children }) => {
//   const [holdings, setHoldings] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const userId = localStorage.getItem("userId");

//   const mergeTrade = (list, trade) => {
//     const index = list.findIndex((t) => t.symbol === trade.symbol);
//     if (index !== -1) {
//       const updated = [...list];
//       updated[index].qty += trade.qty;
//       return updated;
//     }
//     return [...list, trade];
//   };

//   const addToHoldings = async (trade) => {
//     setHoldings((prev) => mergeTrade(prev, trade));
//     try {
//       await axios.post("http://localhost:3002/holdings", {
//         userId,
//         symbol: trade.symbol,
//         qty: trade.qty,
//         price: trade.price,
//       });
//     } catch (err) {
//       console.error("Failed to sync holdings:", err.message);
//     }
//   };

//   const addToPositions = async (trade) => {
//     setPositions((prev) => mergeTrade(prev, trade));
//     try {
//       await axios.post("http://localhost:3002/positions", {
//         userId,
//         symbol: trade.symbol,
//         qty: trade.qty,
//         price: trade.price,
//       });
//     } catch (err) {
//       console.error("Failed to sync positions:", err.message);
//     }
//   };

//   const refreshData = useCallback(async () => {
//     if (!userId) {
//       console.warn("Missing userId — cannot refresh data");
//       return;
//     }

//     setRefreshTrigger((prev) => prev + 1);
//     try {
//       const [holdingsRes, positionsRes] = await Promise.all([
//         axios.get(`http://localhost:3002/holdings/user/${userId}`),
//         axios.get(`http://localhost:3002/positions/user/${userId}`),
//       ]);
//       setHoldings(holdingsRes.data);
//       setPositions(positionsRes.data);
//     } catch (err) {
//       console.error("Refresh failed:", err.message);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) refreshData();
//   }, [userId, refreshData]);

//   return (
//     <GeneralContext.Provider
//       value={{
//         refreshData,
//         refreshTrigger,
//         addToHoldings,
//         addToPositions,
//         holdings,
//         positions,
//       }}
//     >
//       {children}
//     </GeneralContext.Provider>
//   );
// };













// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   createContext,
// } from "react";
// import axios from "axios";

// export const GeneralContext = createContext({
//   refreshData: () => {},
//   refreshTrigger: 0,
//   addToHoldings: () => {},
//   addToPositions: () => {},
//   holdings: [],
//   positions: [],
// });

// export const GeneralContextProvider = ({ children }) => {
//   const [holdings, setHoldings] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const userId = localStorage.getItem("userId");

//   // ✅ Merge logic with price averaging
//   const mergeTrade = (list, trade) => {
//     const index = list.findIndex((t) => t.symbol === trade.symbol);
//     if (index !== -1) {
//       const updated = [...list];
//       const existing = updated[index];
//       const totalQty = existing.qty + trade.qty;
//       const avgPrice =
//         (existing.price * existing.qty + trade.price * trade.qty) / totalQty;
//       updated[index] = {
//         ...existing,
//         qty: totalQty,
//         price: parseFloat(avgPrice.toFixed(2)),
//       };
//       return updated;
//     }
//     return [...list, trade];
//   };

//   const addToHoldings = async (trade) => {
//     if (!userId) return console.warn("Missing userId — cannot add to holdings");
//     setHoldings((prev) => mergeTrade(prev, trade));
//     try {
//       await axios.post("http://localhost:3002/holdings", {
//         userId,
//         symbol: trade.symbol,
//         qty: trade.qty,
//         price: trade.price,
//       });
//     } catch (err) {
//       console.error("Failed to sync holdings:", err.message);
//     }
//   };

//   const addToPositions = async (trade) => {
//     if (!userId) return console.warn("Missing userId — cannot add to positions");
//     setPositions((prev) => mergeTrade(prev, trade));
//     try {
//       await axios.post("http://localhost:3002/positions", {
//         userId,
//         symbol: trade.symbol,
//         qty: trade.qty,
//         price: trade.price,
//       });
//     } catch (err) {
//       console.error("Failed to sync positions:", err.message);
//     }
//   };

//   const refreshData = useCallback(async () => {
//     if (!userId) {
//       console.warn("Missing userId — cannot refresh data");
//       return;
//     }

//     setRefreshTrigger((prev) => prev + 1);
//     try {
//       const [holdingsRes, positionsRes] = await Promise.all([
//         axios.get(`http://localhost:3002/holdings/user/${userId}`),
//         axios.get(`http://localhost:3002/positions/user/${userId}`),
//       ]);
//       setHoldings(holdingsRes.data);
//       setPositions(positionsRes.data);
//     } catch (err) {
//       console.error("Refresh failed:", err.message);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) refreshData();
//   }, [userId, refreshData]);

//   return (
//     <GeneralContext.Provider
//       value={{
//         refreshData,
//         refreshTrigger,
//         addToHoldings,
//         addToPositions,
//         holdings,
//         positions,
//       }}
//     >
//       {children}
//     </GeneralContext.Provider>
//   );
// };






import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import axios from "axios";

export const GeneralContext = createContext({
  refreshData: () => {},
  refreshTrigger: 0,
  addToHoldings: () => {},
  addToPositions: () => {},
  holdings: [],
  positions: [],
});

export const GeneralContextProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const userId = localStorage.getItem("userId");
  const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

  const mergeTrade = (list, trade) => {
    const index = list.findIndex((t) => t.symbol === trade.symbol);
    if (index !== -1) {
      const updated = [...list];
      const existing = updated[index];
      const totalQty = existing.qty + trade.qty;
      const avgPrice =
        (existing.price * existing.qty + trade.price * trade.qty) / totalQty;
      updated[index] = {
        ...existing,
        qty: totalQty,
        price: parseFloat(avgPrice.toFixed(2)),
      };
      return updated;
    }
    return [...list, trade];
  };

  const addToHoldings = async (trade) => {
    if (!userId) return console.warn("Missing userId — cannot add to holdings");
    try {
      await axios.post(`${API_BASE}/holdings`, {
        userId,
        symbol: trade.symbol,
        qty: trade.qty,
        price: trade.price,
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to sync holdings:", err.message);
    }
  };

  const addToPositions = async (trade) => {
    if (!userId) return console.warn("Missing userId — cannot add to positions");
    try {
      await axios.post(`${API_BASE}/positions`, {
        userId,
        symbol: trade.symbol,
        qty: trade.qty,
        price: trade.price,
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to sync positions:", err.message);
    }
  };

  const refreshData = useCallback(async () => {
    if (!userId) {
      console.warn("Missing userId — cannot refresh data");
      return;
    }

    try {
      const [holdingsRes, positionsRes] = await Promise.all([
        axios.get(`${API_BASE}/holdings/user/${userId}`, {
          headers: { "Cache-Control": "no-cache" },
        }),
        axios.get(`${API_BASE}/positions/user/${userId}`, {
          headers: { "Cache-Control": "no-cache" },
        }),
      ]);
      setHoldings(Array.isArray(holdingsRes.data) ? holdingsRes.data : []);
      setPositions(Array.isArray(positionsRes.data) ? positionsRes.data : []);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Refresh failed:", err.message);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) refreshData();
  }, [userId, refreshData]);

  return (
    <GeneralContext.Provider
      value={{
        refreshData,
        refreshTrigger,
        addToHoldings,
        addToPositions,
        holdings,
        positions,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};