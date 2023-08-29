const express = require("express");
const {
    getCaseById,
    getAllCases,
    deleteCase,
} = require("../controllers/fullCase");
const router = express.Router();

//? ROLE MIDDLEWARE IS APPLIED IN src/app.js. NO NEED TO APPLY HERE

router.get("/", getAllCases);
router.get("/:id", getCaseById);

router.post("/", (_req, res) =>
    res
        .status(405)
        .send(
            "Cases are created automatically when a DAM Request has been created, not through this route."
        )
);

router.delete("/:id", deleteCase);

router.module.exports = router;
