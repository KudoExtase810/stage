const User = require("../models/user.js");

// CREATE
async function createUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await User.create(userData);
        newUser.password = undefined;
        res.status(201).json({
            message: "User has been created with success.",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ
async function getUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllUsers(_req, res) {
    try {
        const allUsers = await User.find({}).sort({ username: "ascending" });
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE
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

async function setUserRating(req, res) {
    try {
        const { id } = req.params;
        const user = User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found." });

        user.rating = req.body.rating;
        await user.save();

        res.status(200).json({ message: "User rating set with success." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
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
module.exports = {
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
    editUser,
    setUserRating,
};
