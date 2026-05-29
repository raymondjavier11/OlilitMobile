const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const Company = require("./models/company");
const Contact = require("./models/contact");
const Note = require("./models/note");

dotenv.config();

const run = async () => {
  await connectDB();

  // Clear existing data
  await Company.deleteMany({});
  await Contact.deleteMany({});
  await Note.deleteMany({});
  console.log("  Cleared existing companies, contacts, notes");

  // Seed Companies
  const companies = await Company.insertMany([
    {
      name: "ABCDE Company",
      type: "Law Firm",
      phone: "61239001123",
      address: "3578 Hiney Road, Nevada, Las Vegas",
      generalInfo: {
        referredByPerson: "John Smith",
        leadSource: "Referral",
        badFirmList: "No",
        firmSoftware: "Clio",
        phone2: "091233111133",
        rating: "A+",
        fax: "702-555-0100",
        companyOwner: "Alice Monroe",
      },
      addressInfo: {
        street: "3578 Hiney Road",
        street2: "",
        code: "89101",
        city: "Las Vegas",
        state: "Nevada",
        country: "USA",
        fax: "702-555-0101",
      },
    },
    {
      name: "Global Tech Ltd.",
      type: "Imaging",
      phone: "98765432100",
      address: "245 Sunset Blvd, California, Los Angeles",
      generalInfo: {
        referredByPerson: "Maria Garcia",
        leadSource: "Online",
        badFirmList: "No",
        firmSoftware: "MyCase",
        phone2: "091233222244",
        rating: "B+",
        fax: "310-555-0200",
        companyOwner: "Carlos Rivera",
      },
      addressInfo: {
        street: "245 Sunset Blvd",
        street2: "Suite 100",
        code: "90028",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        fax: "310-555-0201",
      },
    },
    {
      name: "Prime Holdings",
      type: "Neurology",
      phone: "44556677889",
      address: "120 King Street, New York, Manhattan",
      generalInfo: {
        referredByPerson: "Bob Lee",
        leadSource: "Walk-in",
        badFirmList: "No",
        firmSoftware: "PracticePanther",
        phone2: "091233333355",
        rating: "A",
        fax: "212-555-0300",
        companyOwner: "Diana Prince",
      },
      addressInfo: {
        street: "120 King Street",
        street2: "",
        code: "10001",
        city: "Manhattan",
        state: "New York",
        country: "USA",
        fax: "212-555-0301",
      },
    },
    {
      name: "Funding Experts",
      type: "Funding Company",
      phone: "33445566778",
      address: "55 Wall Street, New York, Manhattan",
      generalInfo: {
        referredByPerson: "Tony Stark",
        leadSource: "Referral",
        badFirmList: "No",
        firmSoftware: "Filevine",
        phone2: "091233444466",
        rating: "A-",
        fax: "212-555-0400",
        companyOwner: "Peter Parker",
      },
      addressInfo: {
        street: "55 Wall Street",
        street2: "Floor 10",
        code: "10005",
        city: "Manhattan",
        state: "New York",
        country: "USA",
        fax: "212-555-0401",
      },
    },
    {
      name: "ABCD Company",
      type: "Law Firm",
      phone: "33445566778",
      address: "55 Wall Street, New York, Manhattan",
      generalInfo: {
        referredByPerson: "Bruce Wayne",
        leadSource: "Cold Call",
        badFirmList: "No",
        firmSoftware: "Clio",
        phone2: "091233555577",
        rating: "B",
        fax: "212-555-0500",
        companyOwner: "Clark Kent",
      },
      addressInfo: {
        street: "55 Wall Street",
        street2: "",
        code: "10005",
        city: "Manhattan",
        state: "New York",
        country: "USA",
        fax: "212-555-0501",
      },
    },
  ]);

  console.log(` Inserted ${companies.length} companies`);

  // Seed Contacts (per company)
  const contactsData = [
    { companyIndex: 0, name: "Choi, Kenneth",  role: "Injured Party", company: "ABCDE Company",    phone: "61239001123", date: "December 20 2025" },
    { companyIndex: 0, name: "Garcia, Maria",   role: "Witness",       company: "ABCDE Company",    phone: "98765432100", date: "January 10 2026" },
    { companyIndex: 1, name: "Smith, John",     role: "Claimant",      company: "Global Tech Ltd.", phone: "44556677889", date: "February 02 2026" },
    { companyIndex: 1, name: "Lopez, Angela",   role: "Adjuster",      company: "Global Tech Ltd.", phone: "22334455667", date: "March 05 2026" },
    { companyIndex: 2, name: "Torres, Rafael",  role: "Injured Party", company: "Prime Holdings",   phone: "55667788990", date: "January 15 2026" },
    { companyIndex: 3, name: "Chen, Linda",     role: "Witness",       company: "Funding Experts",  phone: "66778899001", date: "February 20 2026" },
    { companyIndex: 4, name: "Brown, James",    role: "Claimant",      company: "ABCD Company",     phone: "77889900112", date: "March 10 2026" },
  ];

  const contacts = await Contact.insertMany(
    contactsData.map((c) => ({ ...c, companyId: companies[c.companyIndex]._id }))
  );
  console.log(` Inserted ${contacts.length} contacts`);

  // Seed Notes (per company)
  const notesData = [
    { companyIndex: 0, name: "Barry Gould", email: "barry@email.com", message: "Hi team, the discovery documents for ABCDE Company are done." },
    { companyIndex: 0, name: "Barry Gould", email: "barry@email.com", message: "Follow up with client regarding settlement." },
    { companyIndex: 1, name: "Barry Gould", email: "barry@email.com", message: "Global Tech imaging results received and filed." },
    { companyIndex: 2, name: "Barry Gould", email: "barry@email.com", message: "Prime Holdings neurology report pending." },
    { companyIndex: 3, name: "Barry Gould", email: "barry@email.com", message: "Funding approved for Funding Experts case." },
    { companyIndex: 4, name: "Barry Gould", email: "barry@email.com", message: "ABCD Company contract signed and submitted." },
  ];

  const notes = await Note.insertMany(
    notesData.map((n) => ({ ...n, companyId: companies[n.companyIndex]._id }))
  );
  console.log(` Inserted ${notes.length} notes`);

  console.log("\n🎉 Seed complete! Check MongoDB Atlas.");
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
