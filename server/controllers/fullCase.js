const FullCase = require("../models/case/fullCase");

// READ
async function getCaseById(req, res) {
    try {
        const { id } = req.params;
        const fullCase = await FullCase.findById(id).populate([
            "DAMRequest",
            "SJRequest",
            "PV",
            "",
        ]);

        if (!fullCase)
            return res.status(404).json({ message: "Case not found." });

        res.status(200).json(fullCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllCases(_req, res) {
    try {
        const allCases = await FullCase.find({}).populate([
            "DAMRequest",
            "SJRequest",
            "PV",
            "bill",
            "requestedBy",
            "handledBy",
        ]);
        res.status(200).json(allCases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//UPDATE
async function archiveCase(req, res) {
    try {
        const { id } = req.params;
        const fullCase = await FullCase.findById(id);

        if (!fullCase)
            return res.status(404).json({ message: "Case not found." });

        fullCase.isArchived = true;
        await fullCase.save();

        res.status(200).json({ message: "Case archived successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
async function deleteCase(req, res) {
    try {
        const { id } = req.params;
        const fullCase = await FullCase.findByIdAndDelete(id);

        if (!fullCase)
            return res.status(404).json({ message: "Case not found." });

        res.status(200).json({ message: "Case deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getCaseById, getAllCases, archiveCase, deleteCase };
