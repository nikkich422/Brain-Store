import express from "express";
import auth from "../Middleware/auth.js";
import upload from "../Middleware/multer.js";
import {
  getUserDetails,
  loginUserController,
  logoutUserController,
  refresh_token,
  registerUserController,
  removeImageFromCloudinary,
  resendEmailOtpController,
  resetPasswordController,
  sendOtpResetPasswordController,
  updateUserDetails,
  userAvatarController,
  verifyOtpController,
  verifyResetOtpController,
} from "../Controllers/user.controller.js";
import {
  loginLimiter,
  otpLimiter,
  registerLimiter,
} from "../Middleware/rateLimiter.js";
import passport from "passport";
import { getCookieOptions } from "../Utils/cookieOptions.js";

const userRouter = express.Router();

//Public Routes
userRouter.post("/register", registerLimiter, registerUserController);
userRouter.post("/verify-otp", otpLimiter, verifyOtpController);
userRouter.post("/resend-email-otp", otpLimiter, resendEmailOtpController);
userRouter.post("/login", loginLimiter, loginUserController);

// Forgot password flow
userRouter.post(
  "/reset-password/send-otp",
  otpLimiter,
  sendOtpResetPasswordController
);
userRouter.post(
  "/reset-password/verify-otp",
  otpLimiter,
  verifyResetOtpController
);
userRouter.post("/reset-password", resetPasswordController);

// Refresh token (cookie based)
userRouter.post("/refresh-token", refresh_token);

// User actions
userRouter.post("/logout", auth, logoutUserController);
userRouter.get("/details", auth, getUserDetails);
userRouter.put("/update", auth, updateUserDetails);

// Step 1 → redirect to google
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2 → callback
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { accessToken, refreshToken, user } = req.user;

    res.cookie("refreshToken", refreshToken, getCookieOptions());

    // redirect to frontend with access token
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${accessToken}`
    );
  }
);

// Avatar
userRouter.put("/avatar", auth, upload.array("avatar"), userAvatarController);
userRouter.delete("/avatar", auth, removeImageFromCloudinary);

export default userRouter;
