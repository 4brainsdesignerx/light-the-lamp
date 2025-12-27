const express = require("express");
const Diya = require("../models/Diya");
const connectDB = require("../lib/db");

const router = express.Router();
const MAX_DIYAS = 32;

router.get("/diya-state", async (req, res) => {
  try {
    await connectDB();   // ✅ MUST be first

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
    console.error("diya-state error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add-name", async (req, res) => {
  try {
    await connectDB();   // ✅ MUST be first

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });

    const count = await Diya.countDocuments();
    if (count >= MAX_DIYAS) {
      return res.status(409).json({ error: "Diya wall is full" });
    }

    const diya = await Diya.create({
      name,
      diyaIndex: count
    });

    res.json(diya);
  } catch (err) {
    console.error("add-name error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/reset", async (req, res) => {
  try {
    await connectDB();   // ✅ MUST be first
    await Diya.deleteMany({});
    res.json({ message: "Diya wall reset" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
