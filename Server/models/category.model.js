import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true, // Ensure no duplicate category names
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    images: [
      {
        type: String,
      }
    ],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Null for top-level categories
    },
    parentName: {
      type: String,
      default: null, // Optional, snapshot of parent category name
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries on active categories
categorySchema.index({ isActive: 1, name: 1 });

// Pre-save hook to auto-generate slug from name
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  // next();
});

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;