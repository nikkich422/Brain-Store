const mongoose = require("mongoose");

const userPaymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      requied: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      requied: true,
    },
    account_no: {
      type: Number,
      requied: true,
    },
    expiry_data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("userPayment", userPaymentSchema);
