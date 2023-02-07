const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
});

module.exports = mongoose.model("User", userSchema);
