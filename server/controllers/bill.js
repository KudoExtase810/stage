const Bill = require("../models/case/bill");
const FullCase = require("../models/case/fullCase");

// CREATE
async function createBill(req, res) {
    try {
        const { assignTo } = req.body;

        if (!assignTo)
            return res.status(400).json({
                message:
                    "The ID of the full case wasn't provided. The key assignTo is expected.",
            });

        const newBill = await Bill.create(req.body);
        const fullCase = await FullCase.findById(assignTo);

        if (!fullCase)
            return res.status(404).json({ message: "Full case not found." });

        fullCase.bill = newBill._id;
        fullCase.progress < 3 && fullCase.progress++;
        await fullCase.save();

        res.status(201).json({
            message: "New bill created and assigned successfully.",
            updatedFullCase: fullCase,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ
async function getBillById(req, res) {
    try {
        const { id } = req.params;
        const bill = await Bill.findById(id);

        if (!bill) {
            return res.status(404).json({ message: "Bill not found." });
        }

        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllBills(_req, res) {
    try {
        const bill = await Bill.find({});
        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE
async function editBill(req, res) {
    try {
        const { id } = req.params;
        const bill = await Bill.findById(id);

        if (!bill) return res.status(404).json({ message: "Bill not found." });

        if (req.body.caseNumber) bill.caseNumber = req.body.caseNumber;
        if (req.body.date) bill.date = req.body.date;
        if (req.body.place) bill.place = req.body.place;
        if (req.body.service) bill.service = req.body.service;
        if (req.body.commission) bill.commission = req.body.commission;
        if (req.body.subject) bill.subject = req.body.subject;
        if (req.body.huissier) bill.huissier = req.body.huissier;
        if (req.body.from) bill.from = req.body.from;

        await bill.save();

        res.status(200).json("Bill updated successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
async function deleteBill(req, res) {
    try {
        const { id } = req.params;

        const bill = await Bill.findByIdAndDelete(id);

        if (!bill) return res.status(404).json({ message: "Bill not found." });

        const fullCase = await FullCase.findOne({ bill: id });

        if (!fullCase)
            return res.status(404).json({
                message:
                    "No fullcase contains the provided bill. The bill has not been deleted.",
            });

        fullCase.bill = undefined;
        await fullCase.save();

        res.status(200).json({ message: "Bill deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createBill, getBillById, getAllBills, editBill, deleteBill };
