const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");

//  GET /user/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("User fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;