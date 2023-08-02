const jwt = require("jsonwebtoken");
function isAdmin(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    // decode the jwt and retrieve the user's role from it
    const decoded = jwt.decode(token, { complete: true });
    const userRole = decoded.payload.role;

    if (userRole === "admin") {
        next();
    } else {
        res.status(401).json({
            message: "You need to be an Admin in order to proceed.",
        });
    }
}
module.exports = { isAdmin };
