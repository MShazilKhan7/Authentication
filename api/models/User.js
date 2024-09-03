// create user model schema
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 3, max: 255 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: false },
});
// compiling the model...
module.exports = mongoose.model("User", UserSchema);
