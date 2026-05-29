const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,

  permissions: {
    releasePayout: { type: Boolean, default: false },
    settlementOption: { type: Boolean, default: true },
    deleteDeal: { type: Boolean, default: true },
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);