// backend/routes/data.js
const router = require("express").Router();
const MachineData = require("../models/MachineData");

router.post("/data", async (req, res) => {
    const data = await MachineData.create(req.body);
    res.json({ success: true });
});

router.get("/latest", async (req, res) => {
    const latest = await MachineData.find().sort({ createdAt: -1 }).limit(20);
    res.json(latest);
});

module.exports = router;
