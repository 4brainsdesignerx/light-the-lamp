require("dotenv").config();
const express = require("express");
const cors = require("cors");
const diyaRoutes = require("./routes/diyaRoutes");
const connectDB = require("./lib/connectDB");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
// Routes
app.use("/", diyaRoutes);

// Start server ONLY after DB connects
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
