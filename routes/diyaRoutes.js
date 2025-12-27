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

const dummyNames = require("../lib/dummyNames");
const { fillRemaining } = require("../lib/adminFillQueue");

const getNextDiyaIndex = require("../lib/getNextDiyaIndex");

const Counter = require("../models/Counter");


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




// router.post("/add-name", async (req, res) => {
//   try {
//     await connectDB();

//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).json({ error: "Name required" });
//     }

//     // Just enqueue — do NOT create immediately
//     diyaQueue.enqueue(name, Diya, MAX_DIYAS);

//     // Respond instantly (important for mobile UX)
//     res.json({
//       status: "queued",
//       message: "Your diya will be lit shortly"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// router.post("/add-name", async (req, res) => {
//   try {
//     await connectDB();

//     const { name } = req.body;
//     if (!name)
//       return res.status(400).json({ error: "Name required" });

//     const index = await getNextDiyaIndex();

//     if (index >= MAX_DIYAS) {
//       return res.status(409).json({ error: "Diya wall full" });
//     }

//     const diya = await Diya.create({
//       name,
//       diyaIndex: index
//     });

//     res.json({
//       status: "ok",
//       diyaIndex: index
//     });

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

    let diya;
    let index;

    while (true) {
      index = await getNextDiyaIndex();

      if (index >= MAX_DIYAS) {
        return res.status(409).json({ error: "Diya wall full" });
      }

      try {
        diya = await Diya.create({ name, diyaIndex: index });
        break; // success
      } catch (err) {
        // 🔁 If duplicate index, retry
        if (err.code === 11000) continue;
        throw err;
      }
    }

    res.json({ diyaIndex: index });

  } catch (err) {
    console.error("❌ add-name error:", err);
    res.status(500).json({ error: err.message });
  }
});





/**
 * ADMIN: Reset wall
 */
// router.post("/admin/reset", async (req, res) => {
//   try {
//     await connectDB();
//     await Diya.deleteMany({});
//     res.json({ message: "Diya wall reset" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/admin/reset", async (req, res) => {
//   try {
//     await connectDB();

//     await Diya.deleteMany({});
//     await Counter.deleteMany({ name: "diyaIndex" });

//     res.json({ message: "Wall and counter reset" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.post("/admin/reset", async (req, res) => {
  await connectDB();

  await Diya.deleteMany({});
  await Counter.deleteMany({ name: "diyaIndex" });

  res.json({ message: "Wall reset complete" });
});


/**
 * ADMIN: Fill remaining with dummy names
 */
router.post("/admin/fill-remaining", async (req, res) => {
  try {
    await connectDB();

    fillRemaining(Diya, MAX_DIYAS, dummyNames);

    res.json({
      message: "Filling remaining diyas (2s gap)"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
