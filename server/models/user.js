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
        email: {
            type: String,
            minLength: 6,
            maxLength: 72,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            minLength: 6,
            maxLength: 300,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["DAM", "SJ", "Admin"],
        },
        rating: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5] },
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
