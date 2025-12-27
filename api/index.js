// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./lib/db");
// const diyaRoutes = require("./routes/diyaRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// async function start() {
//   await connectDB();          // ⬅️ BLOCK HERE UNTIL CONNECTED

//   app.use("/", diyaRoutes);

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

// start();



const express = require("express");
const cors = require("cors");
const path = require("path");


const diyaRoutes = require("../routes/diyaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/", diyaRoutes);

module.exports = app;
