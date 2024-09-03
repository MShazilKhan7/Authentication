// Import necessary libraries and models
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User"); // Ensure this path is correct
const crypto = import("crypto");
const dotenv = require("dotenv");
const Token = require("../models/Token");
const { sendEmail } = require("../utils/email");

dotenv.config();
// Controller function for user signup
const signUp = async (req, res) => {
  // Destructure email, username, and password from the request body
  console.log(req.body);
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
    user = await new UserModel({ email, username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await user.save();

    const verificationToken = (await crypto).randomBytes(16).toString("hex");
    let token = await new Token({
      userId: user._id,
      token: verificationToken,
      expiry: Date.now() + 900000, // 15 minutes expiry
    }).save();

    const message = `${process.env.BASE_URL_FRONTEND}user/verify/${user.id}/${token.token}`;
    const success = await sendEmail(user.email, "Verify Email", message);
    if (success) {
      res.status(200).send("Email Successfully Sent");
    }
    // Generate JWT token with user payload
    // const payload = { user: { id: user.id } };
    // jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
    //   if (err) throw err;
    // Send the token as JSON response
    res.json({ message: "successfully registered" });
    // });
  } catch (error) {
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

const verifyEmail = async (req, res) => {
  try {
    console.log("i am verifying email");
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send("Invalid link");
    if (token.expiry < Date.now()) return res.status(400).send("link expired");

    await UserModel.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndDelete(token._id);
    res.send({ message: "email verified sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};
// Export the controller functions
module.exports = { signUp, login, verifyEmail };

// to create a frontend route that will handle verify email page.
// call a get request to the verify email route.
//
