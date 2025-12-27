const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.set("bufferCommands", false);

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "test",
      serverSelectionTimeoutMS: 5000
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
