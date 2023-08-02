function isAdmin(req, res, next) {
    const userRole = req.headers["user-role"];

    if (userRole === "admin") {
        next();
    } else {
        res.status(401).json({
            message: "You need to be an Admin in order to proceed.",
        });
    }
}
module.exports = { isAdmin };
