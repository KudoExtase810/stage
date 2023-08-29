const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function isAdmin(req, res, next) {
    try {
        if (!req.headers.authorization)
            return res.status(403).json({
                message: "Access denied. No token was provided in the headers.",
            });

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "Invalid token or token has expired.",
                });
            }

            const userId = decoded._id;
            const user = await User.findById(userId);

            if (!user)
                return res
                    .status(404)
                    .json({ message: "User does not exist." });

            if (user.role === "Admin") {
                next();
            } else {
                res.status(401).json({
                    message: "You need to be an Admin in order to proceed.",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function isDAM(req, res, next) {
    try {
        if (!req.headers.authorization)
            return res.status(403).json({
                message: "Access denied. No token was provided in the headers.",
            });

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "Invalid token or token has expired.",
                });
            }

            const userId = decoded._id;
            const user = await User.findById(userId);

            if (!user)
                return res
                    .status(404)
                    .json({ message: "User does not exist." });

            if (user.role === "DAM") {
                next();
            } else {
                res.status(401).json({
                    message:
                        "You need to have a role of DAM in order to proceed.",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function isSJ(req, res, next) {
    try {
        if (!req.headers.authorization)
            return res.status(403).json({
                message: "Access denied. No token was provided in the headers.",
            });

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "Invalid token or token has expired.",
                });
            }

            const userId = decoded._id;
            const user = await User.findById(userId);

            if (!user)
                return res
                    .status(404)
                    .json({ message: "User does not exist." });

            if (user.role === "SJ") {
                next();
            } else {
                res.status(401).json({
                    message:
                        "You need to have a role of SJ in order to proceed.",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { isAdmin, isDAM, isSJ };
