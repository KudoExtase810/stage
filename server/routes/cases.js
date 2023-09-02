const express = require("express");
const {
    getCaseById,
    getAllCases,
    archiveCase,
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

router.patch("/:id/archive", archiveCase);

router.delete("/:id", deleteCase);

module.exports = router;
