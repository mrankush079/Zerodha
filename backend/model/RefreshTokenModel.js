

const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true, unique: true },
  revoked: { type: Boolean, default: false },
  userAgent: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshTokenModel;