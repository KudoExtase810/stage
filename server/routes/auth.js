const express = require("express");
const { login } = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
//? no register route here, accounts are created by admins

module.exports = router;
