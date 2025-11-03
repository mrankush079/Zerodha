// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { VerticalGraph } from "./VerticalGraph";
// import { GeneralContext } from "./GeneralContext";
// import Spinner from "./spinner";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { refreshTrigger } = useContext(GeneralContext);

//   // ✅ Safe access to env variable
//   const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

//   useEffect(() => {
//     const fetchHoldings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/holdings/allHoldings`);
//         setAllHoldings(res.data || []);
//       } catch (err) {
//         console.error("Axios error:", err.message);
//         toast.error("Failed to load holdings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHoldings();
//   }, [refreshTrigger]);

//   const labels = allHoldings.map((stock) => stock.symbol || stock.name || "N/A");
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => stock.price || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   const totalInvestment = allHoldings.reduce(
//     (acc, stock) => acc + (stock.avg || 0) * (stock.qty || 0),
//     0
//   );
//   const currentValue = allHoldings.reduce(
//     (acc, stock) => acc + (stock.price || 0) * (stock.qty || 0),
//     0
//   );
//   const profitLoss = currentValue - totalInvestment;
//   const profitPercent = totalInvestment
//     ? ((profitLoss / totalInvestment) * 100).toFixed(2)
//     : "0.00";

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <div className="order-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Instrument</th>
//                   <th>Qty.</th>
//                   <th>Avg. cost</th>
//                   <th>LTP</th>
//                   <th>Cur. val</th>
//                   <th>P&L</th>
//                   <th>Net chg.</th>
//                   <th>Day chg.</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allHoldings.map((stock, index) => {
//                   const qty = stock.qty || 0;
//                   const avg = stock.avg || 0;
//                   const price = stock.price || 0;
//                   const curValue = price * qty;
//                   const isProfit = curValue - avg * qty >= 0;
//                   const profClass = isProfit ? "profit" : "loss";
//                   const dayClass = stock.isLoss ? "loss" : "profit";

//                   return (
//                     <tr key={index}>
//                       <td>{stock.symbol || stock.name || "N/A"}</td>
//                       <td>{qty}</td>
//                       <td>{avg.toFixed(2)}</td>
//                       <td>{price.toFixed(2)}</td>
//                       <td>{curValue.toFixed(2)}</td>
//                       <td className={profClass}>
//                         {(curValue - avg * qty).toFixed(2)}
//                       </td>
//                       <td className={profClass}>{stock.net || "—"}</td>
//                       <td className={dayClass}>{stock.day || "—"}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="row">
//             <div className="col">
//               <h5>{totalInvestment.toFixed(2)}</h5>
//               <p>Total investment</p>
//             </div>
//             <div className="col">
//               <h5>{currentValue.toFixed(2)}</h5>
//               <p>Current value</p>
//             </div>
//             <div className="col">
//               <h5>
//                 {profitLoss.toFixed(2)} ({profitPercent}%)
//               </h5>
//               <p>P&L</p>
//             </div>
//           </div>

//           <VerticalGraph data={data} />
//         </>
//       )}

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </>
//   );
// };

// export default Holdings;




// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { VerticalGraph } from "./VerticalGraph";
// import { GeneralContext } from "./GeneralContext";
// import Spinner from "./spinner";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { refreshTrigger } = useContext(GeneralContext);

//   const userId = localStorage.getItem("userId");
//   const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

//   useEffect(() => {
//     const fetchHoldings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/holdings/user/${userId}`, {
//           headers: {
//             "Cache-Control": "no-cache",
//             Pragma: "no-cache",
//             Expires: "0",
//           },
//         });
//         const data = Array.isArray(res.data) ? res.data : [];
//         setAllHoldings(data);
//         if (data.length === 0) toast.info("No holdings found.");
//       } catch (err) {
//         console.error("Axios error:", err.message);
//         toast.error("Failed to load holdings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHoldings();
//   }, [refreshTrigger]);

//   const labels = allHoldings.map((stock) => stock.symbol || stock.name || "N/A");
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => stock.price || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   const totalInvestment = allHoldings.reduce(
//     (acc, stock) => acc + (stock.avg || 0) * (stock.qty || 0),
//     0
//   );
//   const currentValue = allHoldings.reduce(
//     (acc, stock) => acc + (stock.price || 0) * (stock.qty || 0),
//     0
//   );
//   const profitLoss = currentValue - totalInvestment;
//   const profitPercent = totalInvestment
//     ? ((profitLoss / totalInvestment) * 100).toFixed(2)
//     : "0.00";

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <div className="order-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Instrument</th>
//                   <th>Qty.</th>
//                   <th>Avg. cost</th>
//                   <th>LTP</th>
//                   <th>Cur. val</th>
//                   <th>P&L</th>
//                   <th>Net chg.</th>
//                   <th>Day chg.</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allHoldings.map((stock, index) => {
//                   const qty = stock.qty || 0;
//                   const avg = stock.avg || 0;
//                   const price = stock.price || 0;
//                   const curValue = price * qty;
//                   const isProfit = curValue - avg * qty >= 0;
//                   const profClass = isProfit ? "profit" : "loss";
//                   const dayClass = stock.isLoss ? "loss" : "profit";

//                   return (
//                     <tr key={index}>
//                       <td>{stock.symbol || stock.name || "N/A"}</td>
//                       <td>{qty}</td>
//                       <td>{avg.toFixed(2)}</td>
//                       <td>{price.toFixed(2)}</td>
//                       <td>{curValue.toFixed(2)}</td>
//                       <td className={profClass}>
//                         {(curValue - avg * qty).toFixed(2)}
//                       </td>
//                       <td className={profClass}>{stock.net || "—"}</td>
//                       <td className={dayClass}>{stock.day || "—"}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="row">
//             <div className="col">
//               <h5>{totalInvestment.toFixed(2)}</h5>
//               <p>Total investment</p>
//             </div>
//             <div className="col">
//               <h5>{currentValue.toFixed(2)}</h5>
//               <p>Current value</p>
//             </div>
//             <div className="col">
//               <h5>
//                 {profitLoss.toFixed(2)} ({profitPercent}%)
//               </h5>
//               <p>P&L</p>
//             </div>
//           </div>

//           <VerticalGraph data={data} />
//         </>
//       )}

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </>
//   );
// };

// export default Holdings;









import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { GeneralContext } from "./GeneralContext";
import Spinner from "./spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useContext(GeneralContext);

  const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

  useEffect(() => {
    const fetchHoldings = async () => {
      setLoading(true);

      const userId = localStorage.getItem("userId");
      if (!userId || userId === "undefined") {
        toast.error("User ID missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/holdings/user/${userId}`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = Array.isArray(res.data) ? res.data : [];
        setAllHoldings(data);
        if (data.length === 0) toast.info("No holdings found.");
      } catch (err) {
        console.error("Axios error:", err.message);
        toast.error("Failed to load holdings.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [refreshTrigger]);

  const labels = allHoldings.map((stock) => stock.symbol || stock.name || "N/A");
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (stock.avg || 0) * (stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + (stock.price || 0) * (stock.qty || 0),
    0
  );
  const profitLoss = currentValue - totalInvestment;
  const profitPercent = totalInvestment
    ? ((profitLoss / totalInvestment) * 100).toFixed(2)
    : "0.00";

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. cost</th>
                  <th>LTP</th>
                  <th>Cur. val</th>
                  <th>P&L</th>
                  <th>Net chg.</th>
                  <th>Day chg.</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const qty = stock.qty || 0;
                  const avg = stock.avg || 0;
                  const price = stock.price || 0;
                  const curValue = price * qty;
                  const isProfit = curValue - avg * qty >= 0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      <td>{stock.symbol || stock.name || "N/A"}</td>
                      <td>{qty}</td>
                      <td>{avg.toFixed(2)}</td>
                      <td>{price.toFixed(2)}</td>
                      <td>{curValue.toFixed(2)}</td>
                      <td className={profClass}>
                        {(curValue - avg * qty).toFixed(2)}
                      </td>
                      <td className={profClass}>{stock.net || "—"}</td>
                      <td className={dayClass}>{stock.day || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col">
              <h5>{totalInvestment.toFixed(2)}</h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>{currentValue.toFixed(2)}</h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5>
                {profitLoss.toFixed(2)} ({profitPercent}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>

          <VerticalGraph data={data} />
        </>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default Holdings;