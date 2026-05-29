const express = require("express");
const router = express.Router();
const User = require("../models/users");

// GET USERS
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// UPDATE PERMISSIONS
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "permissions.releasePayout": req.body.releasePayout,
          "permissions.settlementOption": req.body.settlementOption,
          "permissions.deleteDeal": req.body.deleteDeal,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;