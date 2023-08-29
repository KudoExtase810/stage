const FullCase = require("../models/case/fullCase");

// READ
async function getCaseById(req, res) {
    try {
        const { id } = req.params;
        const fullCase = await FullCase.findById(id);

        if (!fullCase)
            return res.status(404).json({ message: "Case not found." });

        res.status(200).json(fullCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllCases(req, res) {
    try {
        const allCases = await FullCase.find({});
        res.status(200).json(allCases);
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

module.exports = { getCaseById, getAllCases, deleteCase };
