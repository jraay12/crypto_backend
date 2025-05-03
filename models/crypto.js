const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const cryptoSchema = new mongoose.Schema(
  {
    secretKey: { type: String, default: null },
    password: { type: String, default: null },
  },
  { collection: "crypto", timestamps: true }
);

cryptoSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Crypto", cryptoSchema);
