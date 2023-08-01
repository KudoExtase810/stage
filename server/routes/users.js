const express = require("express");
const { createUser, deleteUser, editUser } = require("../controllers/users");
const isAdmin = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAdmin, createUser);
router.delete("/:userId", isAdmin, deleteUser);
router.put("/:userId", isAdmin, editUser);

module.exports = router;
