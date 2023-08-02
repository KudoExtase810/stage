const jwt = require("jsonwebtoken");
function isAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  // decode the jwt and retrieve the user's role from it
  const decoded = jwt.decode(token, { complete: true });
  const userRole = decoded.payload.role;

  if (userRole === "Admin") {
    next();
  } else {
    res.status(401).json({
      message: "You need to be an Admin in order to proceed.",
    });
  }
}

function isDAM(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  // decode the jwt and retrieve the user's role from it
  const decoded = jwt.decode(token, { complete: true });
  const userRole = decoded.payload.role;

  if (userRole === "DAM") {
    next();
  } else {
    res.status(401).json({
      message: "You need to be a member of DAM in order to proceed.",
    });
  }
}

function isSJ(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  // decode the jwt and retrieve the user's role from it
  const decoded = jwt.decode(token, { complete: true });
  const userRole = decoded.payload.role;

  if (userRole === "SJ") {
    next();
  } else {
    res.status(401).json({
      message: "You need to go SSJ2 in order to proceed.",
    });
  }
}

module.exports = { isAdmin, isDAM, isSJ };
