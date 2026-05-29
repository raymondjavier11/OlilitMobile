const express = require("express");
const router = express.Router();
const Company = require("../models/company");

// GET all companies (with optional search & filter)
router.get("/", async (req, res) => {
  try {
    const { search, type, sort } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    let sortOption = {};
    if (sort === "asc") sortOption.name = 1;
    else if (sort === "desc") sortOption.name = -1;
    else sortOption.createdAt = -1;

    const companies = await Company.find(query).sort(sortOption);
    res.json(companies);
  } catch (err) {
    console.error("GET /companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single company by ID
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create new company
router.post("/", async (req, res) => {
  try {
    const { name, type, phone, address } = req.body;

    if (!name || !type || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const company = await Company.create({ name, type, phone, address });
    res.status(201).json(company);
  } catch (err) {
    console.error("POST /companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update company
router.put("/:id", async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Company not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE company
router.delete("/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;