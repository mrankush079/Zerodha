

import React, { useState, useRef, useEffect } from "react";
import {
  ChartCanvas,
  Chart,
} from "@react-financial-charts/core";
import {
  CandlestickSeries,
  BarSeries,
  LineSeries,
} from "@react-financial-charts/series";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import {
  MouseCoordinateX,
  MouseCoordinateY,
} from "@react-financial-charts/coordinates";
import { discontinuousTimeScaleProviderBuilder } from "@react-financial-charts/scales";
import { timeParse, timeFormat } from "d3-time-format";
import { format } from "d3-format";

const parseDate = timeParse("%Y-%m-%d");

function calculateSMA(data, period = 20) {
  return data.map((d, i) => {
    if (i < period) return { ...d, sma: null };
    const slice = data.slice(i - period, i);
    const avg = slice.reduce((sum, item) => sum + item.close, 0) / period;
    return { ...d, sma: parseFloat(avg.toFixed(2)) };
  });
}

function calculateEMA(data, period = 20) {
  const k = 2 / (period + 1);
  let ema = data[0].close;
  return data.map((d, i) => {
    if (i === 0) return { ...d, ema: ema };
    ema = d.close * k + ema * (1 - k);
    return { ...d, ema: parseFloat(ema.toFixed(2)) };
  });
}

function generateMockCandles(startDateStr, days) {
  const candles = [];
  let currentDate = new Date(startDateStr);
  let price = 100;

  while (candles.length < days) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      const open = price;
      const high = open + Math.random() * 10;
      const low = open - Math.random() * 10;
      const close = low + Math.random() * (high - low);
      const volume = Math.floor(5000 + Math.random() * 5000);

      candles.push({
        date: parseDate(currentDate.toISOString().split("T")[0]),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume,
      });

      price = close;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const withSMA = calculateSMA(candles);
  const withEMA = calculateEMA(withSMA);
  return withEMA;
}

const rawData = generateMockCandles("1994-01-01", 7560); // 30 years

const KPICards = () => {
  const data = [
    { label: "Daily", value: "₹1.42L" },
    { label: "Community", value: "25.35K" },
    { label: "Holding Value", value: "₹72.5K" },
  ];

  const chartWrapperRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(800);
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (chartWrapperRef.current) {
        setChartWidth(chartWrapperRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(rawData);

  const xExtents = [
    xAccessor(chartData[chartData.length - 1000]),
    xAccessor(chartData[chartData.length - 1]),
  ];

  return (
    <div className="kpi-section">
      <div className="kpi-cards">
        {data.map((item, index) => (
          <div key={index} className="kpi-card">
            <h4>{item.label}</h4>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="overlay-toggles">
        <label>
          <input type="checkbox" checked={showSMA} onChange={() => setShowSMA(!showSMA)} />
          Show SMA
        </label>
        <label>
          <input type="checkbox" checked={showEMA} onChange={() => setShowEMA(!showEMA)} />
          Show EMA
        </label>
      </div>

      <div ref={chartWrapperRef} className="chart-wrapper">
        <ChartCanvas
          height={400}
          width={chartWidth}
          ratio={3}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          seriesName="Portfolio"
          data={chartData}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
          panEvent={true}
          zoomEvent={true}
        >
          <Chart id={1} yExtents={d => [d.high, d.low, d.sma, d.ema]}>
            <XAxis />
            <YAxis />
            <MouseCoordinateX displayFormat={timeFormat("%Y-%m-%d")} />
            <MouseCoordinateY displayFormat={format(".2f")} />
            <CandlestickSeries
              stroke={d => (d.close > d.open ? "#26a69a" : "#ef5350")}
              wickStroke={d => (d.close > d.open ? "#26a69a" : "#ef5350")}
              fill={d => (d.close > d.open ? "#26a69a" : "#ef5350")}
            />
            {showSMA && (
              <LineSeries
                yAccessor={d => d.sma}
                stroke="#ff9800"
                strokeWidth={2}
                highlightOnHover
              />
            )}
            {showEMA && (
              <LineSeries
                yAccessor={d => d.ema}
                stroke="#2196f3"
                strokeWidth={2}
                highlightOnHover
              />
            )}
          </Chart>

          <Chart id={2} yExtents={d => d.volume} height={100} origin={(w, h) => [0, h - 100]}>
            <BarSeries
              yAccessor={d => d.volume}
              fill={d => (d.close > d.open ? "#26a69a" : "#ef5350")}
            />
          </Chart>
        </ChartCanvas>
      </div>
    </div>
  );
};

export default KPICards;


