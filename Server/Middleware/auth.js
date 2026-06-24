import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    // console.log("Auth Middleware called");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
        code: "NO_TOKEN",
        error: true,
        success: false,
      });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY
      );

      const user = await userModel
        .findById(decoded.id)
        .select("_id role status");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
          code: "USER_NOT_FOUND",
          error: true,
          success: false,
        });
      }

      if (user.status !== "Active") {
        return res.status(403).json({
          message: "Your account is inactive or suspended",
          code: "USER_BLOCKED",
          error: true,
          success: false,
        });
      }

      req.user = {
        id: user._id,
        role: user.role,
      };

      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired",
          code: "TOKEN_EXPIRED",
          error: true,
          success: false,
        });
      }

      return res.status(401).json({
        message: "Invalid token",
        code: "INVALID_TOKEN",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};

export default auth;