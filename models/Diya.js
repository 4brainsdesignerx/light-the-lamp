// const mongoose = require("mongoose");

// const DiyaSchema = new mongoose.Schema({
//   name: String,
//   diyaIndex: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports =
//   mongoose.models.Diya || mongoose.model("Diya", DiyaSchema);




const mongoose = require("mongoose");

const DiyaSchema = new mongoose.Schema({
  name: String,
  diyaIndex: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.Diya || mongoose.model("Diya", DiyaSchema);
