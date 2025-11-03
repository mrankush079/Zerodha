import React, { useState } from "react";
import { watchlist } from "./data";
import { DoughnutChart } from "./DoughnoutChart";
import WatchListItem from "./WatchListitem";

const COLORS = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
];

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const labels = filteredWatchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price || 0),
        backgroundColor: labels.map(
          (_, i) => COLORS[i % COLORS.length]
        ),
        borderColor: labels.map(
          (_, i) => COLORS[i % COLORS.length].replace("0.5", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">{filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {filteredWatchlist.length > 0 ? (
        <DoughnutChart data={data} />
      ) : (
        <p className="no-results">No matching instruments found.</p>
      )}
    </div>
  );
};

export default WatchList;