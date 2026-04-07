const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Processing"
  },
  assignedTo: {
    type: String
  },
  notes: {
    type: [String],
    default: []
  },
  documents: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);