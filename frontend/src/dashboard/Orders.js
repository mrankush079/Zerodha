// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Spinner from "../dashboard/spinner";
// import { toast, ToastContainer } from "react-toastify";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ symbol: "", mode: "", date: "" });
//   const [isAdmin, setIsAdmin] = useState(false);

//   const userId = localStorage.getItem("userId");
//   const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const url = isAdmin ? `${API_BASE}/orders/all` : `${API_BASE}/orders/user/${userId}`;
//         const res = await axios.get(url);
//         const data = Array.isArray(res.data) ? res.data : [];
//         setOrders(data);
//         setFiltered(data);
//         if (data.length === 0) toast.info("No orders found.");
//       } catch (err) {
//         console.error("Orders fetch error:", err.message);
//         toast.error("Failed to load orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId, isAdmin]);

//   const applyFilters = () => {
//     let result = [...orders];
//     if (filters.symbol) {
//       result = result.filter((o) => o.name.toLowerCase().includes(filters.symbol.toLowerCase()));
//     }
//     if (filters.mode) {
//       result = result.filter((o) => o.mode === filters.mode);
//     }
//     if (filters.date) {
//       result = result.filter((o) =>
//         new Date(o.createdAt).toLocaleDateString() === new Date(filters.date).toLocaleDateString()
//       );
//     }
//     setFiltered(result);
//   };

//   return (
//     <div className="orders-page">
//       <h3 className="title">Orders ({filtered.length})</h3>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Symbol"
//           value={filters.symbol}
//           onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
//         />
//         <select
//           value={filters.mode}
//           onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
//         >
//           <option value="">All</option>
//           <option value="BUY">BUY</option>
//           <option value="SELL">SELL</option>
//         </select>
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//         />
//         <button onClick={applyFilters}>Apply</button>
//         <label>
//           <input
//             type="checkbox"
//             checked={isAdmin}
//             onChange={(e) => setIsAdmin(e.target.checked)}
//           />
//           Admin View
//         </label>
//       </div>

//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="order-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Symbol</th>
//                 <th>Mode</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((order, index) => (
//                 <tr key={index}>
//                   <td>{order.name}</td>
//                   <td className={order.mode === "BUY" ? "buy" : "sell"}>{order.mode}</td>
//                   <td>{order.qty}</td>
//                   <td>₹{order.price.toFixed(2)}</td>
//                   <td>{new Date(order.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Orders;






import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../dashboard/spinner";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ symbol: "", mode: "", date: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const userId = localStorage.getItem("userId");
      if (!isAdmin && (!userId || userId === "undefined")) {
        toast.error("User ID missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const url = isAdmin
          ? `${API_BASE}/orders/all`
          : `${API_BASE}/orders/user/${userId}`;
        const res = await axios.get(url);
        const data = Array.isArray(res.data) ? res.data : [];
        setOrders(data);
        setFiltered(data);
        if (data.length === 0) toast.info("No orders found.");
      } catch (err) {
        console.error("Orders fetch error:", err.message);
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const applyFilters = () => {
    let result = [...orders];
    if (filters.symbol) {
      result = result.filter((o) =>
        o.name.toLowerCase().includes(filters.symbol.toLowerCase())
      );
    }
    if (filters.mode) {
      result = result.filter((o) => o.mode === filters.mode);
    }
    if (filters.date) {
      result = result.filter(
        (o) =>
          new Date(o.createdAt).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
      );
    }
    setFiltered(result);
  };

  return (
    <div className="orders-page">
      <h3 className="title">Orders ({filtered.length})</h3>

      <div className="filters">
        <input
          type="text"
          placeholder="Symbol"
          value={filters.symbol}
          onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
        />
        <select
          value={filters.mode}
          onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
        >
          <option value="">All</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <button onClick={applyFilters}>Apply</button>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin View
        </label>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Mode</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td className={order.mode === "BUY" ? "buy" : "sell"}>
                    {order.mode}
                  </td>
                  <td>{order.qty}</td>
                  <td>₹{order.price.toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Orders;