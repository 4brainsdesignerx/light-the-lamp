require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const diyaRoutes = require("./routes/diyaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", diyaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
