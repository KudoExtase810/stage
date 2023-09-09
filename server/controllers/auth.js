const { verifyPassword } = require("../lib/passwordHash");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user)
            return res
                .status(401)
                .json({ message: "Cet utilisateur n'existe pas." });

        const isMatch = await verifyPassword(req.body.password, user.password);

        if (!isMatch)
            return res.status(401).json({ message: "Identifiants invalides." });

        // how many days until both the jwt and the cookie containing it expire
        // note that token exp time is in (s) while the cookie's is in (ms)
        const expirationDays = 7;
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: expirationDays * 24 * 60 * 60 }
        );

        user.password = undefined;

        res.cookie("sg-auth-token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: expirationDays * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { login };
