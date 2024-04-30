const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      requied: true,
    },
    last_name: {
      type: String,
      requied: true,
    },
    telephone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("myUser", userSchema);
