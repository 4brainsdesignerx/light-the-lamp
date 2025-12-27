require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const diyaRoutes = require("../routes/diyaRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/", diyaRoutes);

// MongoDB connection (cached)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Atlas connected");
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
