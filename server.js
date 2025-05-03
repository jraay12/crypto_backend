require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Crypto = require("./models/crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "crypto",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// POST: Add a crypto entry
app.post("/crypto", async (req, res) => {
  try {
    const { secretKey, password } = req.body;
    const crypto = new Crypto({ secretKey, password });
    await crypto.save();
    res.status(201).json({ message: "Crypto saved", crypto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get all crypto entries
app.get("/crypto", async (req, res) => {
  try {
    const data = await Crypto.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
