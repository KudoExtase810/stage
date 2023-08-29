const mongoose = require("mongoose");

const DAMRequestSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true },
    date: {
        type: String,
        required: true,
    },
    place: { type: String, required: true },
    commission: { type: String, required: true },
    service: { type: String, required: true },
    description: { type: String, maxLength: 1200 },
});

const DAMRequest =
    mongoose.models.DAMRequest ||
    mongoose.model("DAMRequest", DAMRequestSchema);
module.exports = DAMRequest;
