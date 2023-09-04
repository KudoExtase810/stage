const SJRequest = require("../models/case/SJRequest");
const FullCase = require("../models/case/fullCase");

// CREATE
async function createRequest(req, res) {
    try {
        // The id of the full case that our new request will be linked to
        const { assignTo } = req.body;
        const fullCase = await FullCase.findById(assignTo);

        if (!fullCase)
            return res.status(404).json({
                message:
                    "Full case not found. Make sure the DAM has created a request.",
            });

        const newRequest = await SJRequest.create(req.body);

        // link the created request with the full case in order to reference it later.
        fullCase.SJRequest = newRequest._id;
        fullCase.progress < 3 && fullCase.progress++;
        await fullCase.save();

        res.status(201).json({
            message: "Request created successfully.",
            assignedTo: fullCase._id,
            updatedFullCase: fullCase,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ
async function getRequestById(req, res) {
    try {
        const { id } = req.params;
        const request = await SJRequest.findById(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllRequests(_req, res) {
    try {
        const requests = await SJRequest.find({});
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE
async function editRequest(req, res) {
    try {
        const { id } = req.params;
        const request = await SJRequest.findById(id);

        if (!request)
            return res.status(404).json({ message: "Request not found." });

        if (req.body.caseNumber) request.caseNumber = req.body.caseNumber;
        if (req.body.date) request.date = req.body.date;
        if (req.body.place) request.place = req.body.place;
        if (req.body.service) request.service = req.body.service;
        if (req.body.commission) request.commission = req.body.commission;
        if (req.body.subject) request.subject = req.body.subject;
        if (req.body.huissier) request.huissier = req.body.huissier;
        if (req.body.from) request.from = req.body.from;

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

// DELETE
async function deleteRequest(req, res) {
    try {
        const { id } = req.params;
        const request = await SJRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        const fullCase = await FullCase.findOne({ SJRequest: id });

        if (!fullCase)
            return res.status(404).json({
                message:
                    "No fullcase contains the provided SJ Request. The SJ Request has not been deleted.",
            });

        fullCase.SJRequest = undefined;
        await fullCase.save();

        res.status(200).json({
            message: "Request has been deleted successfully.",
        });
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
