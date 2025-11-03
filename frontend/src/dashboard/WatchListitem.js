import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import WatchListActions from "./WatchListActions";

const WatchListItem = ({ stock }) => {
  const [quote, setQuote] = useState({ price: "-", change: "-" });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const API = process.env.REACT_APP_API_URL || "http://localhost:3003";
        const res = await axios.get(`${API}/api/quote/${stock.name}`);

        if (!res.data || res.data.price === 0) {
          setQuote({ price: "-", change: "-" });
        } else {
          setQuote(res.data);
        }
      } catch (err) {
        setQuote({ price: "-", change: "-" });
        console.warn(`Price unavailable for ${stock.name}`);
        // toast.error(`Live price unavailable for ${stock.name}`);
      }
    };

    fetchQuote();
  }, [stock.name]);

  const isValidPrice = typeof quote.price === "number" && quote.price > 0;
  const isChangePositive = quote.change !== "-" && quote.change >= 0;
  const isChangeNegative = quote.change !== "-" && quote.change < 0;

  return (
    <li className="watchlist-item">
      <div className="symbol">{stock.name}</div>

      <div className="price">
        ₹{isValidPrice ? quote.price.toFixed(2) : "—"}
      </div>

      <div
        className={`change ${
          isChangePositive ? "up" : isChangeNegative ? "down" : ""
        }`}
      >
        {quote.change !== "-" ? (
          <>
            {isChangePositive ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            {quote.change}%
          </>
        ) : (
          "N/A"
        )}
      </div>

      {/* ✅ Buy/Sell Actions */}
      {isValidPrice && (
        <WatchListActions
          uid={stock.name}
          livePrice={quote.price}
          change={quote.change}
        />
      )}
    </li>
  );
};

export default WatchListItem;