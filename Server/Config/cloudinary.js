import { v2 as cloudinary } from "cloudinary";

// ✅ FIX: Configure once, import everywhere
// Previously re-configured inside user.controller.js — not DRY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
});

export default cloudinary;
