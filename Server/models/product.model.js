import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    original_price: {
      type: Number,
      default: 0,
      min: [0, "Old price cannot be negative"],
    },
    discount: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    subCategory: {
      type: String,
      default: null,
      lowercase: true,
    },
    size: [
      {
        type: String,
      },
    ],
    stock_count: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    review_count: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      }
    ],
    product_url: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate SEO-friendly slug
productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  this.in_stock = this.stock_count > 0;
  next();
});

productSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ price: 1, rating: -1 });

const productModel = mongoose.model("Product", productSchema);
export default productModel;