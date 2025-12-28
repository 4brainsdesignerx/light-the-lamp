const mongoose = require("mongoose");

const WallStateSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  version: { type: Number, default: 1 }
});

module.exports = mongoose.model("WallState", WallStateSchema);
