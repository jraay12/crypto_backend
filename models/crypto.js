// models/crypto.js
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const cryptoSchema = new mongoose.Schema({
  secretKey: { type: String, default: null },
  password: { type: String, default: null },
});

cryptoSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports =
  mongoose.models.Crypto || mongoose.model("Crypto", cryptoSchema);
