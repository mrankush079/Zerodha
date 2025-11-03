// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// router.get("/", (req, res) => {
//   const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
//   res.json({
//     status: "ok",
//     uptime: process.uptime(),
//     db: dbStatus,
//     timestamp: new Date(),
//   });
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "ok",
    uptime: process.uptime(),
    db: dbStatus,
    timestamp: new Date()
  });
});

module.exports = router;