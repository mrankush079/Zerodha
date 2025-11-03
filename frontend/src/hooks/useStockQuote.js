import { useEffect, useState } from "react";
import axios from "axios";

export const useStockQuote = (symbol) => {
  const [quote, setQuote] = useState({ price: 0, change: 0 });

  useEffect(() => {
    if (!symbol) return;

    const fetchQuote = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/quote/${symbol}`);
        const { price, change } = res.data;
        setQuote({ price, change });
      } catch (err) {
        console.error("Quote fetch error:", err.message);
        setQuote({ price: 0, change: 0 });
      }
    };

    fetchQuote();
  }, [symbol]);

  return quote;
};

