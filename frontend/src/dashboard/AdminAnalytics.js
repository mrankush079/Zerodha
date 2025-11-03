import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const [volumeData, setVolumeData] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [marketTrend, setMarketTrend] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3003";
  const token = localStorage.getItem("token");

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          symbol,
          startDate,
          endDate,
        },
      });
      setVolumeData(res.data.volume || []);
      setTopUsers(res.data.topUsers || []);
      setMarketTrend(res.data.trend || []);
    } catch (err) {
      console.error("Analytics fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleApplyFilters = () => {
    fetchAnalytics();
  };

  const volumeChart = {
    labels: volumeData.map((v) => v.symbol),
    datasets: [
      {
        label: "Trading Volume",
        data: volumeData.map((v) => v.volume),
        backgroundColor: "#0984e3",
      },
    ],
  };

  const trendChart = {
    labels: marketTrend.map((t) => t.date),
    datasets: [
      {
        label: "Market Trend",
        data: marketTrend.map((t) => t.price),
        borderColor: "#00b894",
        fill: false,
      },
    ],
  };

  return (
    <div className="admin-analytics">
      <h3>📊 Analytics Dashboard</h3>
      <p>Here you can visualize trading volume, top users, and market trends.</p>

      <div className="analytics-filters">
        <input
          type="text"
          placeholder="Symbol (e.g. INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>

      <div className="analytics-section">
        <div className="analytics-card">
          <h4>Trading Volume</h4>
          <Bar data={volumeChart} />
        </div>

        <div className="analytics-card">
          <h4>Top Users</h4>
          <ul className="top-users">
            {topUsers.map((user, i) => (
              <li key={i}>
                <strong>{user.name}</strong> — {user.trades} trades
              </li>
            ))}
          </ul>
        </div>

        <div className="analytics-card">
          <h4>Market Trend</h4>
          <Line data={trendChart} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;