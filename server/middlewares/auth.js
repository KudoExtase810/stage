function isAdmin(req, res, next) {
  const { role } = req.headers;
  if (role === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You need admin privilege in order to proceed." });
  }
}
module.exports = isAdmin;
