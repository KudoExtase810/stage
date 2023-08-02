const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 6,
    maxLength: 30,
    required: true,
    unique: true,
  },
  password: { type: String, minLength: 6, maxLength: 30, required: true },
  role: {
    type: String,
    required: true,
    enum: ["DAM", "SJ", "Admin"],
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
