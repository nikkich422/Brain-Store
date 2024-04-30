const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    address_one: {
      type: String,
      required: true,
    },

    address_two: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
    },

    mobile: {
      type: Number,
      require: true,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);
