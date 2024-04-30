const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      requred: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: String,
    },
    rating: {
      type: Number,
    },
    stock: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },

    images: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
