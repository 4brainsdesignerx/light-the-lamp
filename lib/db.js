const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI missing");

// Disable buffering (we WANT errors if not connected)
mongoose.set("bufferCommands", false);

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = {
    conn: null,
    promise: null
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        dbName: "test",               // ✅ matches your Atlas DB
        serverSelectionTimeoutMS: 5000
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
