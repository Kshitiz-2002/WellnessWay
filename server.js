const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require('dotenv').config();
const jwtPassword = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URI);

const User = mongoose.model("User", {
  name: String,
  age: String,
  gender: String,
  address: String,
  city: String,
  state: String,
  phonenum: String,
  emailaddress: String,
  password: String,
  prescriptions: [
    {
      title: String,
      desc: String,
      date: String,
      medicines: [
        {
          name: String,
          time: String,
          timePeriod: String,
        },
      ],
    },
  ],
});

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const {
    name,
    age,
    gender,
    address,
    city,
    state,
    phonenum,
    emailaddress,
    password,
  } = req.body;
  try {
    const existingUser = await User.findOne({ emailaddress });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({
      name,
      age,
      gender,
      address,
      city,
      state,
      phonenum,
      emailaddress,
      password,
    });

    await user.save();

    const token = jwt.sign({ emailaddress }, jwtPassword);
    return res.json({
      msg: "User Created Successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const emailaddress = req.body.emailaddress;
  const password = req.body.password;
  try {
    const user = await User.findOne({ emailaddress });
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ emailaddress }, jwtPassword);

    // Send user data in the response
    return res.json({
      msg: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        age: user.age,
        gender: user.gender,
        address: user.address,
        city: user.city,
        state: user.state,
        phonenum: user.phonenum,
        emailaddress: user.emailaddress,
        __v: user.__v,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/prescriptions", async (req, res) => {
  const emailaddress = req.headers.emailaddress;
  try {
    const user = await User.findOne({ emailaddress });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ prescriptions: user.prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/updatePrescriptions", async (req, res) => {
  const { emailaddress, prescriptions } = req.body;
  try {
    const user = await User.findOne({ emailaddress });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's prescriptions in the database
    user.prescriptions = prescriptions;
    await user.save();

    return res.json({ msg: "Prescriptions updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deletePrescription", async (req, res) => {
  const { emailaddress, prescriptionIndex } = req.body;
  try {
    const user = await User.findOne({ emailaddress });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the prescription at the specified index
    user.prescriptions.splice(prescriptionIndex, 1);

    // Save the updated user
    await user.save();

    return res.json({ msg: "Prescription deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
