const mongoose = require("mongoose");

const FullCaseSchema = new mongoose.Schema(
    {
        DAMRequest: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "DAMRequest",
            required: true,
        },
        SJRequest: { type: mongoose.SchemaTypes.ObjectId, ref: "SJRequest" },
        PV: { type: mongoose.SchemaTypes.ObjectId, ref: "PV" },
        bill: { type: mongoose.SchemaTypes.ObjectId, ref: "Bill" },
        progress: { type: Number, default: 0, min: 0, max: 3 },
        requestedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },

        isArchived: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const FullCase =
    mongoose.models.FullCase || mongoose.model("FullCase", FullCaseSchema);

module.exports = FullCase;
