const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  caseId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "pre-settlement funding"
  },
  status: {
    type: String,
    enum: ["Pending", "Issued", "Rejected"],
    default: "Pending"
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // createdAt ang gagamitin natin as date

module.exports = mongoose.model("Payout", payoutSchema);