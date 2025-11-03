// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "user"], default: "user" },
//   name: String,
//   mobile: String,
// });

// const UserModel = mongoose.model("User", userSchema);
// module.exports = UserModel;






const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  name: String,
  mobile: String,
  avatar: String,
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;