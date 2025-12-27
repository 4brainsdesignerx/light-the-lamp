const express = require("express");
const router = express.Router();
const Diya = require("../models/Diya");

const MAX_DIYAS = 32;

/**
 * POST /add-name
 * Adds a new name and assigns diya index
 */
router.post("/add-name", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });

    const count = await Diya.countDocuments();

    // Auto reset after 32
    if (count >= MAX_DIYAS) {
      await Diya.deleteMany({});
    }

    const newCount = await Diya.countDocuments();
    const diyaIndex = newCount;

    const diya = await Diya.create({
      name,
      diyaIndex
    });

    res.json(diya);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /diya-state
 * Used by Unity
 */
router.get("/diya-state", async (req, res) => {
  try {
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
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /reset
 * Manual reset (admin)
 */
router.post("/reset", async (req, res) => {
  await Diya.deleteMany({});
  res.json({ message: "Diya wall reset" });
});

module.exports = router;
