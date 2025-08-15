const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !emailId || !password) {
    return res.status(400).send({ message: "Please Add all mandatory fields" });
  }

  const userExists = await User.findOne({ emailId });
  if (userExists) {
    return res.status(400).json({ message: "Already Exist" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();

    const tokenGen = generateToken(newUser);

    return res.status(201).json({
      message: "User Registered Successfully",
      data: {
        firstName,
        emailId,
        hashedPassword,
        tokenGen
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser };