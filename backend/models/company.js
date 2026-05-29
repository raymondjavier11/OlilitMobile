const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    // General Information (embedded)
    generalInfo: {
      referredByPerson: { type: String, default: "" },
      leadSource:       { type: String, default: "" },
      badFirmList:      { type: String, default: "No" },
      firmSoftware:     { type: String, default: "" },
      phone2:           { type: String, default: "" },
      rating:           { type: String, default: "" },
      fax:              { type: String, default: "" },
      companyOwner:     { type: String, default: "" },
    },

    // Address Information (embedded)
    addressInfo: {
      street:  { type: String, default: "" },
      street2: { type: String, default: "" },
      code:    { type: String, default: "" },
      city:    { type: String, default: "" },
      state:   { type: String, default: "" },
      country: { type: String, default: "" },
      fax:     { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
