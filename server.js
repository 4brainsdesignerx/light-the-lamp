require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const diyaRoutes = require("./routes/diyaRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ⭐ Serve frontend
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use("/", diyaRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => {
    console.error("❌ MongoDB Atlas error");
    console.error(err.message);
  });
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




