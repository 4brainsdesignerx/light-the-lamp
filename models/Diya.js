const mongoose = require("mongoose");

const DiyaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diyaIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports =
  mongoose.models.Diya || mongoose.model("Diya", DiyaSchema);
