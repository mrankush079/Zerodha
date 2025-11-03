
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Verify access token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access token required" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Decoded user:", decoded);
    }

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ error: err.message });
  }
};

// ✅ Restrict to admin users
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

// ✅ Restrict to self or admin
const requireSelf = (req, res, next) => {
  const requestedUserId = req.params.userId;
  if (req.user.role !== "admin" && req.user.id !== requestedUserId) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, requireAdmin, requireSelf };