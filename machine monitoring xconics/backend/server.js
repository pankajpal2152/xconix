const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes (⬅ THIS LINE GOES HERE)
app.use("/api", require("./routes/data"));

// database
mongoose.connect("mongodb://127.0.0.1:27017/machine_monitoring")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// server start
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
