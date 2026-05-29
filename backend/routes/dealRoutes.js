const express = require("express");
const router = express.Router();

const Deal = require("../models/deal");

// GET all deals
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single deal
router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;