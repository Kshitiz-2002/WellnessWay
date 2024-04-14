const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "Anonymo   us@123";

mongoose.connect(
  "mongodb+srv://kshitizpandey2002:kshitiz2002@cluster0.0w5mn8q.mongodb.net/WelnessWay",
);

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

const Doctor = mongoose.model("Doctor", {
  name: String,
  specialty: String,
  phonenum: String,
  emailaddress: String,
  workingHours: String,
  city: String,
  state: String,
  address: String,
});

const Nurse = mongoose.model("Nurse", {
  name: String,
  workingHours: String,
  phonenum: String,
  emailaddress: String,
  specialty: String,
});

const Pathology = mongoose.model("Pathology", {
  name: String,
  workingHours: String,
  phonenum: String,
  emailaddress: String,
  specialty: String,
});

const Pharmacy = mongoose.model("Pharmacy", {
  name: String,
  workingHours: String,
  phonenum: String,
  emailaddress: String,
  specialty: String,
});

const Physiotherapy = mongoose.model("Physiotherapy", {
  name: String,
  workingHours: String,
  phonenum: String,
  emailaddress: String,
  specialty: String,
});

const Hospital = mongoose.model("Hospital", {
  name: String,
  address: String,
  city: String,
  state: String,
  phonenum: String,
  emailaddress: String,
  specialty: String,
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
    await user.save();

    return res.json({ msg: "Prescriptions updated successfully" });
    user.prescriptions = prescriptions;
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

// Doctor-related endpoint
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/doctorsRegister", async (req, res) => {
  const {
    name,
    specialty,
    phonenum,
    emailaddress,
    workingHours,
    city,
    state,
    address,
  } = req.body;
  try {
    if (
      !name ||
      !specialty ||
      !phonenum ||
      !emailaddress ||
      !workingHours ||
      !city ||
      !state ||
      !address
    ) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const existingDoctor = await Doctor.findOne({ emailaddress });
    if (existingDoctor) {
      return res.status(400).json({ error: "Doctor already registered" });
    }

    const doctor = new Doctor({
      name,
      specialty,
      phonenum,
      emailaddress,
      workingHours,
      city,
      state,
      address,
    });
    await doctor.save();
    res.json({ msg: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Nurse-related endpoints
app.post("/registerNurse", async (req, res) => {
  const { name, workingHours, phonenum, emailaddress, specialty } = req.body;
  console.log(name);
  try {
    if (!name || !workingHours || !phonenum || !emailaddress || !specialty) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const existingNurse = await Nurse.findOne({ emailaddress });
    if (existingNurse) {
      return res.status(400).json({ error: "Nurse already registered" });
    }

    const nurse = new Nurse({
      name,
      workingHours,
      phonenum,
      emailaddress,
      specialty,
    });
    await nurse.save();
    res.json({ msg: "Nurse registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/nurses", async (req, res) => {
  try {
    const nurses = await Nurse.find({});
    res.json({ nurses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Pathology-related endpoints
app.post("/registerPathology", async (req, res) => {
  const { name, workingHours, phonenum, emailaddress, specialty } = req.body;
  try {
    if (!name || !workingHours || !phonenum || !emailaddress || !specialty) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const existingPathology = await Pathology.findOne({ emailaddress });
    if (existingPathology) {
      return res.status(400).json({ error: "Pathology already registered" });
    }

    const pathology = new Pathology({
      name,
      workingHours,
      phonenum,
      emailaddress,
      specialty,
    });
    await pathology.save();
    res.json({ msg: "Pathology registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/pathologies", async (req, res) => {
  try {
    const pathologies = await Pathology.find({});
    res.json({ pathologies });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Pharmacy-related endpoints
app.post("/registerPharmacy", async (req, res) => {
  const { name, workingHours, phonenum, emailaddress, specialty } = req.body;
  try {
    if (!name || !workingHours || !phonenum || !emailaddress || !specialty) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const existingPharmacy = await Pharmacy.findOne({ emailaddress });
    if (existingPharmacy) {
      return res.status(400).json({ error: "Pharmacy already registered" });
    }

    const pharmacy = new Pharmacy({
      name,
      workingHours,
      phonenum,
      emailaddress,
      specialty,
    });
    await pharmacy.save();
    res.json({ msg: "Pharmacy registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/pharmacies", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({});
    res.json({ pharmacies });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Physiotherapy-related endpoints
app.post("/registerPhysiotherapy", async (req, res) => {
  const { name, workingHours, phonenum, emailaddress, specialty } = req.body;
  try {
    if (!name || !workingHours || !phonenum || !emailaddress || !specialty) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const existingPhysiotherapy = await Physiotherapy.findOne({ emailaddress });
    if (existingPhysiotherapy) {
      return res
        .status(400)
        .json({ error: "Physiotherapy already registered" });
    }

    const physiotherapy = new Physiotherapy({
      name,
      workingHours,
      phonenum,
      emailaddress,
      specialty,
    });
    await physiotherapy.save();
    res.json({ msg: "Physiotherapy registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/physiotherapies", async (req, res) => {
  try {
    const physiotherapies = await Physiotherapy.find({});
    res.json({ physiotherapies });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Hospital-related endpoints
app.post("/registerHospital", async (req, res) => {
  const { name, address, city, state, phonenum, emailaddress } = req.body;
  try {
    // Check if any required fields are missing
    if (!name || !address || !city || !state || !phonenum || !emailaddress) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    // Check if the hospital already exists
    const existingHospital = await Hospital.findOne({ emailaddress });
    if (existingHospital) {
      return res.status(400).json({ error: "Hospital already registered" });
    }

    // Create a new hospital instance
    const hospital = new Hospital({
      name,
      address,
      city,
      state,
      phonenum,
      emailaddress,
    });

    // Save the hospital data to the database
    await hospital.save();

    // Send success response
    res.json({ msg: "Hospital registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/allHospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.json({ hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/hospitals", async (req, res) => {
  const { city, state } = req.query;
  try {
    let hospitals;
    if (city && state) {
      // Fetch hospitals only from the same city and state as the user
      hospitals = await Hospital.find({ city, state });
    } else {
      // If city and state are not provided, return an error
      return res
        .status(400)
        .json({ error: "City and state parameters are required" });
    }
    res.json({ hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all data
app.get("/allData", async (req, res) => {
  try {
    const users = await User.find({});
    const doctors = await Doctor.find({});
    const nurses = await Nurse.find({});
    const pathologies = await Pathology.find({});
    const pharmacies = await Pharmacy.find({});
    const physiotherapies = await Physiotherapy.find({});
    const hospitals = await Hospital.find({});

    const allData = {
      users,
      doctors,
      nurses,
      pathologies,
      pharmacies,
      physiotherapies,
      hospitals,
    };

    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
