
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../model/UserModel.js");
const RefreshTokenModel = require("../model/RefreshTokenModel.js");
const { verifyToken, requireAdmin, requireSelf } = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, role, name, mobile, avatar } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role,
      name,
      mobile,
      avatar,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    await RefreshTokenModel.deleteMany({ userId: user._id });

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      avatar: user.avatar || "",
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

    await RefreshTokenModel.create({ userId: user._id, token: refreshToken });

    res.json({
      accessToken,
      refreshToken,
      role: user.role,
      name: user.name,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Refresh token
router.post("/refresh", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(403).json({ message: "Refresh token required" });

    const stored = await RefreshTokenModel.findOne({ token });
    if (!stored) return res.status(403).json({ message: "Invalid refresh token" });

    const user = jwt.verify(token, REFRESH_SECRET);

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        avatar: user.avatar || "",
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(401).json({ message: "Token expired or invalid" });
  }
});

// ✅ Logout
router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    await RefreshTokenModel.deleteOne({ token });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user profile (protected)
router.get("/user/:userId", verifyToken, requireSelf, async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// ✅ Update user profile (protected)
router.put("/user/:userId", verifyToken, requireSelf, async (req, res) => {
  const { userId } = req.params;
  const { name, mobile, avatar } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { name, mobile, avatar },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

module.exports = router;