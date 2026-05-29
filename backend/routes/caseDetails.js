const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Contact = require("../models/contact");
const Note = require("../models/note");

// GET full case details of a company (generalInfo + addressInfo + contacts + notes)
router.get("/:companyId", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const contacts = await Contact.find({ companyId: req.params.companyId }).sort({ createdAt: -1 });
    const notes = await Note.find({ companyId: req.params.companyId }).sort({ createdAt: -1 });

    res.json({
      company,
      contacts,
      notes,
    });
  } catch (err) {
    console.error("GET /case-details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST add a new note to a company
router.post("/:companyId/notes", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    const note = await Note.create({
      companyId: req.params.companyId,
      name: name || "Anonymous",
      email: email || "",
      message,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("POST /notes error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST add a new contact to a company
router.post("/:companyId/contacts", async (req, res) => {
  try {
    const { name, role, company, phone, date } = req.body;

    if (!name || !role) return res.status(400).json({ message: "Name and role are required" });

    const contact = await Contact.create({
      companyId: req.params.companyId,
      name,
      role,
      company,
      phone,
      date,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error("POST /contacts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;