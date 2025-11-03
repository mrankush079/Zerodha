// const express = require("express");
// const router = express.Router();
// const { verifyToken, requireAdmin } = require("../middleware/auth");

// // Admin-only dashboard
// router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
//   res.send("Welcome Admin. You have full access.");
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const { verifyToken, requireAdmin } = require("../middleware/auth");
// const UserModel = require("../model/UserModel");

// // ✅ Admin-only dashboard access
// router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
//   res.send("Welcome Admin. You have full access.");
// });

// // ✅ Get all users (no passwords)
// router.get("/users", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
//     res.json(users);
//   } catch (err) {
//     console.error("Admin fetch users error:", err.message);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // ✅ Update user role (e.g. promote to admin)
// router.put("/users/:id/role", verifyToken, requireAdmin, async (req, res) => {
//   const { role } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     );
//     res.json({ message: "Role updated", user: updated });
//   } catch (err) {
//     console.error("Role update error:", err.message);
//     res.status(500).json({ error: "Failed to update role" });
//   }
// });

// // ✅ Toggle user active/inactive status
// router.put("/users/:id/status", verifyToken, requireAdmin, async (req, res) => {
//   const { active } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { active },
//       { new: true }
//     );
//     res.json({ message: "Status updated", user: updated });
//   } catch (err) {
//     console.error("Status update error:", err.message);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// // ✅ View system logs (mocked)
// router.get("/logs", verifyToken, requireAdmin, async (req, res) => {
//   const logs = [
//     { type: "LOGIN", user: "arash", time: new Date() },
//     { type: "TRADE", user: "ankush", symbol: "TCS", qty: 5, time: new Date() },
//     { type: "ERROR", message: "API key missing", time: new Date() },
//   ];
//   res.json(logs);
// });

// module.exports = router;







// const express = require("express");
// const router = express.Router();
// const { verifyToken, requireAdmin } = require("../middleware/auth");
// const UserModel = require("../model/UserModel");
// // const LogModel = require("../model/LogModel"); // Optional: for real logs

// // ✅ Admin-only dashboard access
// router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
//   res.send("Welcome Admin. You have full access.");
// });

// // ✅ Get all users (no passwords)
// router.get("/users", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
//     res.json(users);
//   } catch (err) {
//     console.error("Admin fetch users error:", err.message);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // ✅ Update user role (e.g. promote to admin)
// router.put("/users/:id/role", verifyToken, requireAdmin, async (req, res) => {
//   const { role } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     );
//     res.json({ message: "Role updated", user: updated });
//   } catch (err) {
//     console.error("Role update error:", err.message);
//     res.status(500).json({ error: "Failed to update role" });
//   }
// });

// // ✅ Toggle user active/inactive status
// router.put("/users/:id/status", verifyToken, requireAdmin, async (req, res) => {
//   const { active } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { active },
//       { new: true }
//     );
//     res.json({ message: "Status updated", user: updated });
//   } catch (err) {
//     console.error("Status update error:", err.message);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// // ✅ View system logs (mocked or real)
// router.get("/logs", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     // Optional: use MongoDB logs if available
//     // const logs = await LogModel.find().sort({ time: -1 });

//     // Mocked logs for now
//     const logs = [
//       { type: "LOGIN", user: "arash", time: new Date() },
//       { type: "TRADE", user: "ankush", symbol: "TCS", qty: 5, time: new Date() },
//       { type: "ERROR", message: "API key missing", time: new Date() },
//     ];

//     res.json(logs);
//   } catch (err) {
//     console.error("Log fetch error:", err.message);
//     res.status(500).json({ error: "Failed to fetch logs" });
//   }
// });

// module.exports = router;
















// const express = require("express");
// const router = express.Router();
// const { verifyToken, requireAdmin } = require("../middleware/auth");
// const UserModel = require("../model/UserModel");
// const LogModel = require("../model/LogModel");

// // ✅ Admin-only dashboard access
// router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
//   res.send("Welcome Admin. You have full access.");
// });

// // ✅ Get all users (no passwords)
// router.get("/users", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
//     res.json(users);
//   } catch (err) {
//     console.error("Admin fetch users error:", err.message);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // ✅ Update user role
// router.put("/users/:id/role", verifyToken, requireAdmin, async (req, res) => {
//   const { role } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     );

//     await LogModel.create({
//       type: "ROLE_CHANGE",
//       user: updated.name || updated.email,
//       message: `Role changed to ${role}`,
//     });

//     res.json({ message: "Role updated", user: updated });
//   } catch (err) {
//     console.error("Role update error:", err.message);
//     res.status(500).json({ error: "Failed to update role" });
//   }
// });

// // ✅ Toggle user active/inactive status
// router.put("/users/:id/status", verifyToken, requireAdmin, async (req, res) => {
//   const { active } = req.body;
//   try {
//     const updated = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { active },
//       { new: true }
//     );

//     await LogModel.create({
//       type: "STATUS_TOGGLE",
//       user: updated.name || updated.email,
//       message: `Status set to ${active ? "Active" : "Inactive"}`,
//     });

//     res.json({ message: "Status updated", user: updated });
//   } catch (err) {
//     console.error("Status update error:", err.message);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// // ✅ View system logs with filters
// router.get("/logs", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     const { type, user, archived } = req.query;
//     const filter = {};

//     if (type) filter.type = type.toUpperCase();
//     if (user) filter.user = new RegExp(user, "i");
//     if (archived === "true") filter.archived = true;
//     else filter.archived = false;

//     const logs = await LogModel.find(filter).sort({ time: -1 }).limit(100);
//     res.json(logs);
//   } catch (err) {
//     console.error("Log fetch error:", err.message);
//     res.status(500).json({ error: "Failed to fetch logs" });
//   }
// });

// // ✅ Archive a log (soft delete)
// router.put("/logs/:id/archive", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     const updated = await LogModel.findByIdAndUpdate(
//       req.params.id,
//       { archived: true },
//       { new: true }
//     );
//     res.json({ message: "Log archived", log: updated });
//   } catch (err) {
//     console.error("Log archive error:", err.message);
//     res.status(500).json({ error: "Failed to archive log" });
//   }
// });

// // ✅ Delete a log permanently
// router.delete("/logs/:id", verifyToken, requireAdmin, async (req, res) => {
//   try {
//     await LogModel.findByIdAndDelete(req.params.id);
//     res.json({ message: "Log deleted permanently" });
//   } catch (err) {
//     console.error("Log delete error:", err.message);
//     res.status(500).json({ error: "Failed to delete log" });
//   }
// });
  
// module.exports = router;











const express = require("express");
const router = express.Router();
const { verifyToken, requireAdmin } = require("../middleware/auth");
const UserModel = require("../model/UserModel");
const LogModel = require("../model/LogModel");
const TradeModel = require("../model/TradeModel"); // ✅ Required for analytics

// ✅ Admin-only dashboard access
router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
  res.send("Welcome Admin. You have full access.");
});

// ✅ Get all users (no passwords)
router.get("/users", verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Admin fetch users error:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Update user role
router.put("/users/:id/role", verifyToken, requireAdmin, async (req, res) => {
  const { role } = req.body;
  try {
    const updated = await UserModel.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    await LogModel.create({
      type: "ROLE_CHANGE",
      user: updated.name || updated.email,
      message: `Role changed to ${role}`,
    });

    res.json({ message: "Role updated", user: updated });
  } catch (err) {
    console.error("Role update error:", err.message);
    res.status(500).json({ error: "Failed to update role" });
  }
});

// ✅ Toggle user active/inactive status
router.put("/users/:id/status", verifyToken, requireAdmin, async (req, res) => {
  const { active } = req.body;
  try {
    const updated = await UserModel.findByIdAndUpdate(
      req.params.id,
      { active },
      { new: true }
    );

    await LogModel.create({
      type: "STATUS_TOGGLE",
      user: updated.name || updated.email,
      message: `Status set to ${active ? "Active" : "Inactive"}`,
    });

    res.json({ message: "Status updated", user: updated });
  } catch (err) {
    console.error("Status update error:", err.message);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ View system logs with filters
router.get("/logs", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { type, user, archived } = req.query;
    const filter = {};

    if (type) filter.type = type.toUpperCase();
    if (user) filter.user = new RegExp(user, "i");
    if (archived === "true") filter.archived = true;
    else filter.archived = false;

    const logs = await LogModel.find(filter).sort({ time: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    console.error("Log fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// ✅ Archive a log (soft delete)
router.put("/logs/:id/archive", verifyToken, requireAdmin, async (req, res) => {
  try {
    const updated = await LogModel.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    res.json({ message: "Log archived", log: updated });
  } catch (err) {
    console.error("Log archive error:", err.message);
    res.status(500).json({ error: "Failed to archive log" });
  }
});

// ✅ Delete a log permanently
router.delete("/logs/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await LogModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted permanently" });
  } catch (err) {
    console.error("Log delete error:", err.message);
    res.status(500).json({ error: "Failed to delete log" });
  }
});

// ✅ Analytics with filters (symbol, startDate, endDate)
router.get("/analytics", verifyToken, requireAdmin, async (req, res) => {
  const { symbol, startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate) dateFilter.$gte = new Date(startDate);
  if (endDate) dateFilter.$lte = new Date(endDate);

  const query = {};
  if (symbol) query.symbol = symbol.toUpperCase();
  if (startDate || endDate) query.time = dateFilter;

  try {
    const volume = await TradeModel.aggregate([
      { $match: query },
      { $group: { _id: "$symbol", volume: { $sum: "$qty" } } },
      { $project: { symbol: "$_id", volume: 1, _id: 0 } },
    ]);

    const topUsers = await TradeModel.aggregate([
      { $match: query },
      { $group: { _id: "$user", trades: { $sum: 1 } } },
      { $sort: { trades: -1 } },
      { $limit: 5 },
      { $project: { name: "$_id", trades: 1, _id: 0 } },
    ]);

    const trend = await TradeModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$time" },
          },
          price: { $avg: "$price" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", price: 1, _id: 0 } },
    ]);

    res.json({ volume, topUsers, trend });
  } catch (err) {
    console.error("Analytics fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;

