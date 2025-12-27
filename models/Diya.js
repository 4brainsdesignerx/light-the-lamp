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
  name: {
    type: String,
    required: true
  },
  diyaIndex: {
    type: Number,
    required: true,
    unique: true   // 🔥 IMPORTANT
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔥 ENSURE UNIQUE INDEX EXISTS
DiyaSchema.index({ diyaIndex: 1 }, { unique: true });

module.exports = mongoose.model("Diya", DiyaSchema);
