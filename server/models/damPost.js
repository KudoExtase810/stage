const mongoose = require("mongoose");

const DAMPostSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true },
    date: {
        type: String,
        required: true,
    },
    place: { type: String, required: true },
    comission: { type: String, required: true },
    service: { type: String, required: true },
    description: { type: String, maxLength: 1200 },
});

const DAMPost =
    mongoose.models.DAMPost || mongoose.model("DAMPost", DAMPostSchema);
module.exports = DAMPost;
