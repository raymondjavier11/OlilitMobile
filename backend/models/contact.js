const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

  personName: String,

  name: String,

  type: String,

  phone: String,

  address: String,

  date: String,

}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);