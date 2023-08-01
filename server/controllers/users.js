const User = require("../models/user.js");

async function createUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    res.status(201).json({ message: "User has been created with success." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function editUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User has been updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createUser, deleteUser, editUser };
