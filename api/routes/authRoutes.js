const express = require("express");
const {
  login,
  signUp,
  verifyEmail,
} = require("../controllers/authControllers");
const router = express.Router();

// Define routes with leading slashes
router.get("/users", async (req, res) => {
  res.send({ message: "hello" });
});
router.post("/signup", signUp);
router.post("/login", login);
router.get("/user/verify/:id/:token", verifyEmail);

module.exports = router;
