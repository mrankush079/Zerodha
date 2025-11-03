




// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const morgan = require("morgan");

// const app = express();
// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// // ✅ Route imports
// const authRoutes = require("./routes/auth");
// const ordersRoutes = require("./routes/orders");
// const holdingsRoutes = require("./routes/holdings");
// const positionsRoutes = require("./routes/positions");
// const adminRoutes = require("./routes/admin");
// const healthRoutes = require("./routes/health");
// const newOrderRoute = require("./routes/newOrder");
// const quoteRoutes = require("./routes/quote");
// const errorHandler = require("./middleware/errorHandler");

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // ✅ Static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Health check
// app.get("/health", (req, res) => {
//   res.send("Server is healthy");
// });

// // ✅ Modular routes
// app.use("/auth", authRoutes);
// app.use("/orders", ordersRoutes);
// app.use("/holdings", holdingsRoutes); // ✅ Includes /holdings/allHoldings
// app.use("/positions", positionsRoutes);
// app.use("/admin", adminRoutes);
// app.use("/health", healthRoutes);
// app.use("/newOrder", newOrderRoute);
// app.use("/api/quote", quoteRoutes);

// // ✅ Error handler
// app.use(errorHandler);

// // ✅ Start server
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("DB connected!");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("DB connection error:", err.message);
//   });







// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const morgan = require("morgan");

// const app = express();
// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// // ✅ Route imports
// const authRoutes = require("./routes/auth");
// const ordersRoutes = require("./routes/orders");       // ✅ Includes /orders/user/:id and /orders/all
// const holdingsRoutes = require("./routes/holdings");   // ✅ Includes /holdings/user/:id and /holdings/allHoldings
// const positionsRoutes = require("./routes/positions");
// const adminRoutes = require("./routes/admin");
// const healthRoutes = require("./routes/health");
// const newOrderRoute = require("./routes/newOrder");    // ✅ Handles order placement + holdings update
// const quoteRoutes = require("./routes/quote");
// const errorHandler = require("./middleware/errorHandler");

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // ✅ Static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // ✅ Health check
// // app.get("/health", (req, res) => {
// //   res.send("Server is healthy");
// // });

// app.get("/health", async (req, res) => {
//   const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
//   res.status(200).json({
//     status: "Server is healthy",
//     db: dbStatus,
//     timestamp: new Date()
//   });
// });







// // ✅ Modular routes
// app.use("/auth", authRoutes);
// app.use("/orders", ordersRoutes);
// app.use("/holdings", holdingsRoutes);
// app.use("/positions", positionsRoutes);
// app.use("/admin", adminRoutes);
// app.use("/health", healthRoutes); // Optional: redundant with GET /health above
// app.use("/newOrder", newOrderRoute);
// app.use("/api/quote", quoteRoutes);

// // ✅ Error handler
// app.use(errorHandler);

// // ✅ Start server
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("DB connected!");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("DB connection error:", err.message);
//   });



require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI; // ✅ Corrected variable name

// ✅ Middleware
app.use(cors({
  origin: "https://your-frontend.vercel.app", // 🔁 Replace with actual frontend URL
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Modular routes
app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/orders"));
app.use("/holdings", require("./routes/holdings"));
app.use("/positions", require("./routes/positions"));
app.use("/admin", require("./routes/admin"));
app.use("/newOrder", require("./routes/newOrder"));
app.use("/api/quote", require("./routes/quote"));
app.use("/health", require("./routes/health")); // Modular health route
app.use(require("./middleware/errorHandler"));

// ✅ Root route for Render health check
app.get("/", (req, res) => {
  res.send("Zerodha backend is running");
});

// ✅ Start server (always bind to port for Render)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Connect to MongoDB (no deprecated options)
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

// ✅ MongoDB error listener
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});