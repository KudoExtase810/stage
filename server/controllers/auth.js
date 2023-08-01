const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user)
            return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET
        );
        user.password = undefined;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { login };
