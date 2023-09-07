const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // //Email Validation
    // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //Thought Model
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //User Model
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;