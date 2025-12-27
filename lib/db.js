// const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     console.log("⏳ Connecting to MongoDB...");

//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 5000
//     });

//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection failed");
//     console.error(err.message);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;


const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      dbName: "test",
      serverSelectionTimeoutMS: 5000
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
