const express = require("express");
const {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    setUserRating,
} = require("../controllers/users");
const { isAdmin, verifyToken } = require("../middlewares/auth");

const router = express.Router();

// CREATE
router.post("/create", isAdmin, createUser);

// TODO: create isAuth and add it below
// READ
router.get("/all", isAdmin, getAllUsers);
router.get("/:userId", getUser);

// UPDATE
router.put("/:userId", isAdmin, editUser);
router.patch("/rating/:userId", verifyToken, setUserRating);

// DELETE
router.delete("/:userId", isAdmin, deleteUser);

module.exports = router;
