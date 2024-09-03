const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// database to store the tokens

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
  },
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
