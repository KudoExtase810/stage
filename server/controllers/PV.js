const PV = require("../models/case/PV");
const FullCase = require("../models/case/fullCase");

// CREATE
async function createPV(req, res) {
    try {
        const { assignTo } = req.body;

        if (!assignTo)
            return res.status(400).json({
                message:
                    "The ID of the full case wasn't provided. The key assignTo is expected.",
            });

        const newPV = await PV.create(req.body);
        const fullCase = await FullCase.findById(assignTo);

        if (!fullCase)
            return res.status(404).json({ message: "Full case not found." });

        fullCase.PV = newPV._id;
        fullCase.progress < 3 && fullCase.progress++;
        await fullCase.save();

        res.status(201).json({
            message: "New PV created and assigned successfully.",
            updatedFullCase: fullCase,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ
async function getPVById(req, res) {
    try {
        const { id } = req.params;
        const pv = await PV.findById(id);

        if (!pv) {
            return res.status(404).json({ message: "PV not found." });
        }

        res.status(200).json(pv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//!  to be removed in all forms
async function getAllPVs(_req, res) {
    try {
        const pv = await PV.find({});
        res.status(200).json(pv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE
async function editPV(req, res) {
    try {
        const { id } = req.params;
        const pv = await PV.findById(id);

        if (!pv) return res.status(404).json({ message: "PV not found." });

        if (req.body.caseNumber) pv.caseNumber = req.body.caseNumber;
        if (req.body.date) pv.date = req.body.date;
        if (req.body.place) pv.place = req.body.place;
        if (req.body.service) pv.service = req.body.service;
        if (req.body.commission) pv.commission = req.body.commission;
        if (req.body.subject) pv.subject = req.body.subject;
        if (req.body.huissier) pv.huissier = req.body.huissier;
        if (req.body.from) pv.from = req.body.from;

        await pv.save();

        res.status(200).json("PV updated successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
// ! to be removed in all forms
async function deletePV(req, res) {
    try {
        const { id } = req.params;

        const pv = await PV.findByIdAndDelete(id);

        if (!pv) return res.status(404).json({ message: "PV not found." });

        const fullCase = await FullCase.findOne({ PV: id });

        if (!fullCase)
            return res.status(404).json({
                message:
                    "No fullcase contains the provided PV. The PV has not been deleted.",
            });

        fullCase.PV = undefined;
        await fullCase.save();

        res.status(200).json({ message: "PV has been deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPV, getPVById, getAllPVs, editPV, deletePV };
