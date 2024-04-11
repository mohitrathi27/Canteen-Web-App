// Assuming your User model is defined like this
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,  unique: true, trim: true, lowercase: true },
  number: { type: String, required: true },
  collegeId: { type: String, required: true, unique: true, trim: true},
  password: { type: String, required: true, trim: true },
  // username: { type: String, required: true },
  // password: { type: String, required: true },
  balance: { type: Number, default: 0 ,integer: true}, // Assuming balance is a number
});

module.exports = mongoose.model("Users", userSchema);
