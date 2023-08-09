const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minLength: 6,
            maxLength: 32,
            required: true,
            unique: true,
        },
        password: { type: String, minLength: 6, maxLength: 32, required: true },
        role: {
            type: String,
            required: true,
            enum: ["DAM", "SJ", "Admin"],
        },
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
