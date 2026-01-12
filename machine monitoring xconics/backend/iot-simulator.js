
const axios = require("axios");

setInterval(() => {
    axios.post("http://localhost:5000/api/data", {
        machineId: "M-101",
        temperature: 60 + Math.random() * 20,
        rpm: 1200 + Math.random() * 300,
        voltage: 220 + Math.random() * 10,
        status: Math.random() > 0.9 ? "FAULT" : "RUNNING"
    });
}, 3000);
