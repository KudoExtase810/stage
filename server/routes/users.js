const express = require("express");
const { createUser, deleteUser, editUser } = require("../controllers/users");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

// CREATE
router.post("/create", isAdmin, createUser);

// READ

// UPDATE
router.put("/:userId", isAdmin, editUser);

// DELETE
router.delete("/:userId", isAdmin, deleteUser);

module.exports = router;
