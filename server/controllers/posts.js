const { SJPost, SJPostBill, SJPostPV } = require("../models/sjPost");
const DAMPost = require("../models/damPost");

async function createDAMPost(req, res) {
    try {
        const newPost = await DAMPost.create(req.body);
        res.status(201).json({
            message: "A new post has been created.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createSJPost(req, res) {
    try {
        const postType = req.params.type;
        if (postType === "PV") {
            const newPost = await SJPostPV.create(req.body);
        } else if (postType === "Bill") {
            const newPost = await SJPostBill.create(req.body);
        } else {
            const newPost = await SJPost.create(req.body);
        }

        res.status(201).json({
            message: "A new post has been created.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createDAMPost, createSJPost };
