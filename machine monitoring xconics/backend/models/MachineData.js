// backend/models/MachineData.js
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    machineId: String,
    temperature: Number,
    rpm: Number,
    voltage: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MachineData", schema);
