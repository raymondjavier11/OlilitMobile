const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/users");
const Deal = require("./models/deals");
const Payout = require("./models/payouts");      
const payoutRoutes = require("./routes/payouts"); 
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const caseDetailsRoutes = require("./routes/caseDetails");
const Contact = require("./models/contact");
const contactRoutes = require("./routes/contacts");

dotenv.config();
connectDB();


// Deal.create({
//   clientName: "John Doe",
//   amount: 50000,
//   status: "Processing"
// })
//   .then(() => console.log("Deal inserted successfully"))
//   .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/payouts", payoutRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/companies", companyRoutes);
app.use("/api/case-details", caseDetailsRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/api/contacts", async (req, res) => {

  try {

    const contacts = await Contact.find();

    res.json(contacts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});