// const express = require("express");
// const Diya = require("../models/Diya");

// const router = express.Router();
// const MAX_DIYAS = 32;

// router.post("/add-name", async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name || name.trim() === "") {
//       return res.status(400).json({ error: "Name required" });
//     }

//     const count = await Diya.countDocuments();

//     if (count >= MAX_DIYAS) {
//       return res.status(409).json({ error: "Diya wall full" });
//     }

//     const diya = await Diya.create({
//       name: name.trim(),
//       diyaIndex: count
//     });

//     res.json(diya);
//   } catch (err) {
//     console.error("❌ add-name error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/diya-state", async (req, res) => {
//   try {
//     const data = await Diya.find()
//       .sort({ createdAt: 1 })
//       .limit(MAX_DIYAS);

//     res.json({
//       items: data.map(d => ({
//         name: d.name,
//         diyaIndex: d.diyaIndex
//       }))
//     });
//   } catch (err) {
//     console.error("❌ diya-state error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const Diya = require("../models/Diya");
const connectDB = require("../lib/db");
const diyaQueue = require("../lib/diyaQueue");

const router = express.Router();
const MAX_DIYAS = 32;

router.get("/diya-state", async (req, res) => {
  try {
    await connectDB();

    const data = await Diya.find()
      .sort({ createdAt: 1 })
      .limit(MAX_DIYAS);

    res.json({
      items: data.map(d => ({
        name: d.name,
        diyaIndex: d.diyaIndex
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// router.post("/add-name", async (req, res) => {
//   try {
//     await connectDB();

//     const { name } = req.body;
//     if (!name) return res.status(400).json({ error: "Name required" });

//     const count = await Diya.countDocuments();
//     if (count >= MAX_DIYAS) {
//       return res.status(409).json({ error: "Diya wall full" });
//     }

//     const diya = await Diya.create({
//       name,
//       diyaIndex: count
//     });

//     res.json(diya);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/add-name", async (req, res) => {
  try {
    await connectDB();

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    // Just enqueue — do NOT create immediately
    diyaQueue.enqueue(name, Diya, MAX_DIYAS);

    // Respond instantly (important for mobile UX)
    res.json({
      status: "queued",
      message: "Your diya will be lit shortly"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
