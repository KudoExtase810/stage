const express = require("express");
// request
const {
    createRequest,
    getRequestById,
    getAllRequests,
    editRequest,
    deleteRequest,
} = require("../controllers/SJRequest");

// PV
const {
    createPV,
    getPVById,
    getAllPVs,
    editPV,
    deletePV,
} = require("../controllers/PV");

// bill
const {
    createBill,
    getBillById,
    getAllBills,
    editBill,
    deleteBill,
} = require("../controllers/bill");

const router = express.Router();

//? ROLE MIDDLEWARE IS APPLIED IN src/app.js. NO NEED TO APPLY HERE

// get all
router.get("/request", getAllRequests);
router.get("/bill", getAllBills);
router.get("/pv", getAllPVs);

// get by id
router.get("/request/:id", getRequestById);
router.get("/bill/:id", getBillById);
router.get("/pv/:id", getPVById);

// create new
router.post("/request", createRequest);
router.post("/bill", createBill);
router.post("/pv", createPV);

// update
router.put("/request/:id", editRequest);
router.put("/bill/:id", editBill);
router.put("/pv/:id", editPV);

// delete
router.delete("/request/:id", deleteRequest);
router.delete("/bill/:id", deleteBill);
router.delete("/pv/:id", deletePV);

module.exports = router;
