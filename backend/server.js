const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/users");
const Deal = require("./models/deals");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});