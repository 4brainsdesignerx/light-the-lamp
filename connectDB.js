const mongoose = require("mongoose");

let isConnected = false;

module.exports = async function connectDB() {
  if (isConnected) return;

  mongoose.set("strictQuery", true);

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "test"
  });

  isConnected = true;
  console.log("✅ MongoDB connected");
};
