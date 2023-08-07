const express = require("express");
const { isDAM, isSJ } = require("../middlewares/auth");
const { createSJPost, createDAMPost } = require("../controllers/posts");

const router = express.Router();

router.post("/DAM", isDAM, createDAMPost);
router.post("/SJ/:type", isSJ, createSJPost);

module.exports = router;
