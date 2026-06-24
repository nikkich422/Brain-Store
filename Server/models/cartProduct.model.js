import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Quantity cannot be less than 1"],
    },
    title:{
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index ensures one product per user in cart
cartProductSchema.index({ userId: 1, productId: 1 , size: 1}, { unique: true });

// Pre-save hook to calculate totalPrice automatically
cartProductSchema.pre("save", function (next) {
  this.totalPrice = this.price * this.quantity;
  // next();
});

const cartProductModel = mongoose.model("CartProduct", cartProductSchema);
export default cartProductModel;