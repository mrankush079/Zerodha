
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

//  Dynamic CORS origin support
const allowedOrigins = [
  "http://localhost:3000",
  "https://zerodha-ten-beta.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(" Blocked CORS origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

//  Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

//  Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  Modular routes
app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/orders"));
app.use("/holdings", require("./routes/holdings"));
app.use("/positions", require("./routes/positions"));
app.use("/admin", require("./routes/admin"));
app.use("/newOrder", require("./routes/newOrder"));
app.use("/api/quote", require("./routes/quote"));
app.use("/health", require("./routes/health"));
app.use("/user", require("./routes/user")); //  Added user route

//  Error handler middleware
app.use(require("./middleware/errorHandler"));

//  Root route for health check
app.get("/", (req, res) => {
  res.send("Zerodha backend is running");
});

//  Catch-all for unmatched routes
app.use((req, res) => {
  console.warn(" Unmatched route:", req.method, req.url);
  res.status(404).json({ message: "Route not found" });
});

//  Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// ✅ Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(" DB connection error:", err.message));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});