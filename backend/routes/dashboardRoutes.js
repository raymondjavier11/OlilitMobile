const express = require("express");
const router = express.Router();

const Deal = require("../models/deal");

router.get("/stats", async (req, res) => {
  try {
    const totalDeals = await Deal.countDocuments();
    const processing = await Deal.countDocuments({
      status: "Processing"
    });

    res.json({
      totalDeals,
      processing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;