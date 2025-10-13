const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// REGISTER USER
const registerUser = async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !emailId || !password) {
    return res.status(400).json({ message: "Please fill all mandatory fields" });
  }

  try {
    const userExists = await User.findOne({ emailId });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        firstName: newUser.firstName,
        emailId: newUser.emailId,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      data: {
        firstName: user.firstName,
        emailId: user.emailId,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
