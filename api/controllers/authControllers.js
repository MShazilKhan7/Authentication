// Import necessary libraries and models
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User"); // Ensure this path is correct

// Controller function for user signup
const signUp = async (req, res) => {
  // Destructure email, username, and password from the request body
  const { email, username, password } = req.body;

  // Check if any of the required fields are missing
  if (!(email && username && password)) {
    console.log("invalid");
  }

  // Log the received email, username, and password
  console.log(email, username, password);

  try {
    // Check if a user with the same email already exists
    let user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance and hash the password
    user = new UserModel({ email, username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await user.save();

    // Generate JWT token with user payload
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      // Send the token as JSON response
      res.json({ token });
    });
  } catch (error) {
    // Log and handle errors
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Controller function for user login
const login = async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;
  console.log(req);
  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user payload
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secret", { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      // Send the token as JSON response
      res.json({ token });
    });
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Export the controller functions
module.exports = { signUp, login };
