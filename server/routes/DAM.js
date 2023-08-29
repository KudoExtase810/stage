const express = require("express");
const { isDAM } = require("../middlewares/auth");
const {
    getAllRequests,
    getRequestById,
    createRequest,
    editRequest,
} = require("../controllers/DAMRequest");

const router = express.Router();

// READ
router.get("/", getAllRequests);
router.get("/:id", getRequestById);

// CREATE
router.post("/", isDAM, createRequest);

// UPDATE
router.put("/:id", isDAM, editRequest);

module.exports = router;
