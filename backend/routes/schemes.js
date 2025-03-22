const express = require("express");
const router = express.Router();
const Scheme = require("../models/scheme");

// Fetch Schemes by Category
router.get("/", async (req, res) => {
  try {
    const category = req.query.category; // Get category from query parameter
    if (!category) return res.status(400).json({ error: "Category is required" });

    const schemes = await Scheme.find({ category: { $regex: new RegExp(category, "i") } });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching schemes" });
  }
});


module.exports = router;
