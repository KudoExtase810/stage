const mongoose = require("mongoose");

const SJRequestSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    commission: { type: String, required: true },
    service: { type: String, required: true },
    subject: { type: String, maxLength: 560, required: true },
    huissier: { type: String, required: true },
    from: { type: String, required: true },
});

const SJRequest =
    mongoose.models.SJRequest || mongoose.model("SJRequest", SJRequestSchema);

module.exports = SJRequest;
