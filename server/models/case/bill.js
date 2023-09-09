const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true },
    date: {
        type: String,
        required: true,
    },
    lieu: { type: String, required: true },
    service: { type: String, required: true },
    huissier: { type: String, required: true },
    payment: { type: String, required: true },
});

const Bill = mongoose.models.Bill || mongoose.model("Bill", BillSchema);

module.exports = Bill;
