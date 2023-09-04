const DAMRequest = require("../models/case/DAMRequest");
const FullCase = require("../models/case/fullCase");

// CREATE
async function createRequest(req, res) {
    try {
        const newRequest = await DAMRequest.create(req.body);
        const newCase = await FullCase.create({
            DAMRequest: newRequest._id,
            requestedBy: req.body.requestedBy,
        });
        res.status(201).json({
            message:
                "Successfully created a new case with the submitted request.",
            newRequest,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ
async function getRequestById(req, res) {
    try {
        const { id } = req.params;
        const request = await DAMRequest.findById(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllRequests(req, res) {
    try {
        const requests = await DAMRequest.find({});
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE
async function editRequest(req, res) {
    try {
        const { id } = req.params;
        const request = await DAMRequest.findById(id);

        if (!request)
            return res.status(404).json({ message: "Request not found." });

        if (req.body.caseNumber) request.caseNumber = req.body.caseNumber;
        if (req.body.date) request.date = req.body.date;
        if (req.body.place) request.place = req.body.place;
        if (req.body.service) request.service = req.body.service;
        if (req.body.commission) request.commission = req.body.commission;
        if (req.body.description) request.description = req.body.description;

        // Object.assign(request, req.body); or use this instead of doing each individually

        await request.save();

        res.status(200).json({
            message: "Request updated successfully.",
            updated: request,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE (not used)
async function deleteRequest(req, res) {
    try {
        const { id } = req.params;
        const request = await DAMRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        res.status(200).json({ message: "Request has been deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRequest,
    getRequestById,
    getAllRequests,
    editRequest,
    deleteRequest,
};
