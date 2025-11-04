import { useEffect, useState } from "react";
import axios from "axios";

export const useStockQuote = (symbol) => {
  const [quote, setQuote] = useState({ price: 0, change: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

  useEffect(() => {
    if (!symbol) return;

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/api/quote/${symbol}`);
        const { price, change } = res.data;
        setQuote({ price, change });
        setError(null);
      } catch (err) {
        console.error(" Quote fetch error:", err.message);
        setQuote({ price: 0, change: 0 });
        setError("Failed to fetch quote");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [symbol, API]);

  return { quote, loading, error };
};