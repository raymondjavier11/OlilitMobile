const express = require("express");
const router = express.Router();
const Payout = require("../models/payouts");

// GET - lahat ng payouts
router.get("/", async (req, res) => {
  try {
    const payouts = await Payout.find().sort({ createdAt: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - gumawa ng bagong payout
router.post("/", async (req, res) => {
  try {
    const payout = await Payout.create({
      clientName: req.body.clientName,
      caseId: req.body.caseId,
      type: req.body.type,
      status: req.body.status,
      value: req.body.value,
    });
    res.status(201).json(payout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;