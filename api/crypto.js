// api/crypto.js
const mongoose = require("mongoose");
const Crypto = require("../models/crypto");

let conn = null;

const connectToDatabase = async () => {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "crypto",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
};

module.exports = async (req, res) => {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { secretKey, password } = req.body;
      const crypto = new Crypto({ secretKey, password });
      await crypto.save();
      return res.status(201).json({ message: "Crypto saved", crypto });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const data = await Crypto.find();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
