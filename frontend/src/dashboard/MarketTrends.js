import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const marketIndices = [
  {
    name: "Bank NIFTY A",
    value: "19,875.50",
    change: "+1.12%",
    trend: [18800, 19000, 19200, 19800, 19875],
    color: "#4caf50",
  },
  {
    name: "Bank NIFTY B",
    value: "45,210.80",
    change: "-0.70%",
    trend: [45500, 45400, 45300, 45200, 45210],
    color: "#f44336",
  },
];

const topGainers = [
  { name: "RELIANCE", change: "+2.1%" },
  { name: "KOTAK", change: "+1.1%" },
  { name: "IOC", change: "+1.5%" },
];

const topLosers = [
  { name: "TATA MOTORS", change: "-1.2%" },
  { name: "HINDUNILVR", change: "-1.1%" },
  { name: "BHARTI AIRTEL", change: "-1.5%" },
];

const tickerData = [
  { name: "TCS", change: "-0.1%" },
  { name: "WIPRO", change: "-2.3%" },
  { name: "AXISBANK", change: "+1.1%" },
  { name: "IOC", change: "-1.5%" },
  { name: "HINDUNILVR", change: "-1.1%" },
  { name: "RELIANCE", change: "+2.1%" },
  { name: "TATA MOTORS", change: "-1.2%" },
];

const PerformanceCard = ({ name, change }) => {
  const value = parseFloat(change);
  const isPositive = value >= 0;
  const barWidth = Math.min(Math.abs(value), 10) * 10;
  const color = isPositive ? "#4caf50" : "#f44336";

  const handleClick = () => {
    console.log(`Clicked on ${name}`);
    // Optional: navigate(`/stock/${name}`)
  };

  return (
    <div className="performance-card" onClick={handleClick} title={`${name}: ${change}`}>
      <div className="card-header">
        <span>{name}</span>
        <span style={{ color }}>{change}</span>
      </div>
      <div className="bar-wrapper">
        <div
          className="bar-fill"
          style={{
            width: `${barWidth}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

const MarketTrends = () => {
  return (
    <div className="market-trends-light">
      {/* Index Panels */}
      <div className="index-panels">
        {marketIndices.map((index, i) => (
          <div key={i} className="index-card">
            <div className="index-header">
              <h4>{index.name}</h4>
              <p style={{ color: index.color }}>
                {index.value} ({index.change})
              </p>
            </div>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={index.trend.map((val) => ({ val }))}>
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke={index.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Top Movers */}
      <div className="performance-section">
        <div className="gainers-block">
          <h4>Top Gainers</h4>
          {topGainers.map((stock, i) => (
            <PerformanceCard key={i} name={stock.name} change={stock.change} />
          ))}
        </div>
        <div className="losers-block">
          <h4>Top Losers</h4>
          {topLosers.map((stock, i) => (
            <PerformanceCard key={i} name={stock.name} change={stock.change} />
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-light">
        {tickerData.map((stock, i) => (
          <span key={i} className={stock.change.startsWith("+") ? "up" : "down"}>
            {stock.name}: {stock.change}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarketTrends;