import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import sendEmailFunc from "../Config/sendMail.js";
import verificationEmail from "../Config/verifyMailTemplate.js";
import { generateAccessToken, generateRefreshToken } from "../Utils/tokens.js";
import fs from "fs";
import cloudinary from "../Config/cloudinary.js";
import { getCookieOptions } from "../Utils/cookieOptions.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const registerUserController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  
  name = name?.trim();
  email = email?.toLowerCase().trim();
  password = password?.trim();

  if (!name || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "All details are required.",
      code: "VALIDATION_ERROR",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 6 characters",
      code: "INVALID_PASSWORD",
    });
  }

  const existingUser = await userModel
    .findOne({ email })
    .select("+emailVerificationOtp +emailVerificationOtpExpires");

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const hashedOtp = await bcrypt.hash(verifyCode, 10);

  if (existingUser) {
    if (existingUser.isEmailVerified) {
      return res.status(400).json({
        error: true,
        message: "User Already Registered with this email",
        code: "USER_ALREADY_EXISTS",
      });
    }

    existingUser.name = name;
    existingUser.password = password;
    existingUser.emailVerificationOtp = hashedOtp;
    existingUser.emailVerificationOtpExpires = otpExpiry;
    existingUser.otpLastSentAt = new Date();

    await existingUser.save();

    // ✅ FIX: OTP only logged in development, never in production
    if (process.env.NODE_ENV !== "production") {
      console.log("Email Verify Otp (dev only):", verifyCode);
    }

    return res.status(200).json({
      success: true,
      code: "REGISTER_OTP_SENT",
      message: "Verification OTP sent Successfully",
      data: { email, expiresInSeconds: 600 },
    });
  }

  const user = new userModel({
    name,
    email,
    password,
    emailVerificationOtp: hashedOtp,
    emailVerificationOtpExpires: otpExpiry,
    otpLastSentAt: new Date(),
  });

  await user.save();

  // ✅ FIX: OTP only logged in development
  if (process.env.NODE_ENV !== "production") {
    console.log("EMAIL VERIFY OTP (dev only):", verifyCode);
  }

  // TODO: Uncomment and configure email sending for production
  await sendEmailFunc(email, "Verify Email", "", verificationEmail(name, verifyCode));

  return res.status(201).json({
    success: true,
    message: "User registered Successfully. Please verify your email.",
    code: "REGISTER_OTP_SENT",
    data: { email, expiresInSeconds: 600 },
  });
});

export const verifyResetOtpController = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;

  email = email?.toLowerCase().trim();
  otp = otp?.trim();

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  const user = await userModel
    .findOne({ email })
    .select("+passwordResetOtp +passwordResetOtpExpires");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isOtpValid = await bcrypt.compare(otp, user.passwordResetOtp);

  if (!isOtpValid) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  if (user.passwordResetOtpExpires < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  user.passwordResetOtp = null;
  user.passwordResetOtpExpires = null;
  user.isPasswordResetAllowed = true;
  await user.save();

  return res.status(200).json({ success: true, message: "OTP verified successfully" });
});

export const verifyOtpController = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;

  email = email?.toLowerCase().trim();
  otp = otp?.trim();

  if (!email || !otp) {
    return res.status(400).json({
      error: true,
      code: "VALIDATION_ERROR",
      message: "Email and OTP are required",
    });
  }

  const user = await userModel
    .findOne({ email })
    .select("+emailVerificationOtp +emailVerificationOtpExpires +refreshTokens");

  if (!user) {
    return res.status(404).json({
      error: true,
      code: "USER_NOT_FOUND",
      message: "User not found",
    });
  }

  if (user.isEmailVerified) {
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    user.lastLoginDate = new Date();
    await user.addRefreshToken(refreshToken);
    res.cookie("refreshToken", refreshToken, getCookieOptions());
    return res.status(200).json({
      success: true,
      code: "EMAIL_ALREADY_VERIFIED_LOGIN_SUCCESS",
      message: "Email already verified",
      data: { accessToken, user: user.toJSON() },
    });
  }

  const isOtpValid = await bcrypt.compare(otp, user.emailVerificationOtp);
  const isNotExpired =
    user.emailVerificationOtpExpires &&
    user.emailVerificationOtpExpires > Date.now();

  if (!isOtpValid) {
    return res.status(400).json({ error: true, code: "INVALID_OTP", message: "Invalid OTP" });
  }
  if (!isNotExpired) {
    return res.status(400).json({ error: true, code: "OTP_EXPIRED", message: "OTP Expired" });
  }

  user.isEmailVerified = true;
  user.emailVerificationOtp = null;
  user.emailVerificationOtpExpires = null;
  user.lastLoginDate = new Date();

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  await user.addRefreshToken(refreshToken);
  res.cookie("refreshToken", refreshToken, getCookieOptions());

  return res.status(200).json({
    success: true,
    code: "EMAIL_VERIFIED_LOGIN_SUCCESS",
    message: "Email Verified Successfully",
    data: { accessToken, user: user.toJSON() },
  });
});

export const resendEmailOtpController = asyncHandler(async (req, res) => {
  let { email } = req.body;
  email = email?.toLowerCase()?.trim();

  if (!email) {
    return res.status(400).json({ error: true, code: "VALIDATION_ERROR", message: "Email is required" });
  }

  const user = await userModel
    .findOne({ email })
    .select("+emailVerificationOtp +emailVerificationOtpExpires");

  if (!user) {
    return res.status(404).json({ error: true, code: "USER_NOT_FOUND", message: "User not found" });
  }
  if (user.isEmailVerified) {
    return res.status(400).json({ error: true, code: "EMAIL_ALREADY_VERIFIED", message: "Email Already Verified" });
  }
  if (user.otpLastSentAt && Date.now() - new Date(user.otpLastSentAt).getTime() < 30 * 1000) {
    return res.status(429).json({ error: true, code: "OTP_RESEND_TOO_SOON", message: "Please wait before requesting another OTP" });
  }

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(verifyCode, 10);

  user.emailVerificationOtp = hashedOtp;
  user.emailVerificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.otpLastSentAt = new Date();

  await user.save();

  // ✅ FIX: Only log OTP in development
  if (process.env.NODE_ENV !== "production") {
    console.log("RESENT EMAIL VERIFY OTP (dev only):", verifyCode);
  }

  return res.status(200).json({
    success: true,
    code: "OTP_RESENT_SUCCESS",
    message: "OTP resent Successfully",
    data: { email, expiresInSeconds: 600 },
  });
});

export const loginUserController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = email?.toLowerCase().trim();

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required", error: true });
  }

  const user = await userModel.findOne({ email }).select("+password +refreshTokens");

  if (!user) {
    return res.status(404).json({ message: "User not registered.", error: true });
  }
  if (user.provider === "google") {
    return res.status(400).json({ message: "Please login with Google" });
  }
  if (!user.isEmailVerified) {
    return res.status(403).json({
      error: true,
      code: "EMAIL_NOT_VERIFIED",
      message: "Email is not verified yet, please verify it first",
      data: { email: user.email },
    });
  }
  if (user.status !== "Active") {
    return res.status(403).json({ message: "Your account has been suspended. Contact admin.", error: true });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect Password", error: true });
  }

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  user.lastLoginDate = new Date();
  await user.addRefreshToken(refreshToken);
  res.cookie("refreshToken", refreshToken, getCookieOptions());

  return res.status(200).json({
    message: "Login Successful",
    success: true,
    data: { accessToken, user: user.toJSON() },
  });
});

export const logoutUserController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "No Refresh token found", error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
  } catch {
    return res.status(401).json({ message: "Invalid Refresh token", error: true });
  }

  const user = await userModel.findById(decoded.id).select("+refreshTokens");
  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }

  const tokenExists = user.refreshTokens.some((item) => item.token === refreshToken);
  if (!tokenExists) {
    return res.status(400).json({ message: "Session already expired", error: true });
  }

  user.refreshTokens = user.refreshTokens.filter((item) => item.token !== refreshToken);
  await user.save();

  res.clearCookie("refreshToken", getCookieOptions());

  return res.status(200).json({ message: "Logout Successfully", code: "LOGOUT_SUCCESS", success: true });
});

export const userAvatarController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Please upload an image", error: true });
  }

  const options = { use_filename: true, unique_filename: false, overwrite: false };
  const imagesArr = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path, options);
    imagesArr.push(result.secure_url);
    await fs.promises.unlink(file.path);
  }

  user.avatar = imagesArr[0];
  await user.save();

  return res.status(200).json({ _id: userId, avatar: imagesArr[0] });
});

export const removeImageFromCloudinary = asyncHandler(async (req, res) => {
  const imgUrl = req.query.img;
  if (!imgUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const imageName = image.split(".")[0];

  if (imageName) {
    const result = await cloudinary.uploader.destroy(imageName);
    res.status(200).json(result);
  }
});

export const updateUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let { name, email, mobile } = req.body;
  email = email?.toLowerCase().trim();

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required", error: true });
  }

  // ✅ FIX: Validate mobile format if provided
  if (mobile && !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ message: "Mobile must be a valid 10-digit number", error: true });
  }

  const userExist = await userModel.findById(userId);
  if (!userExist) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingEmail = await userModel.findOne({ email, _id: { $ne: userId } });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already in use", error: true });
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { name, mobile, email },
    { returnDocument: "after" }
  );

  return res.status(200).json({
    message: "User Updated Successfully",
    success: true,
    user: updatedUser,
  });
});

export const sendOtpResetPasswordController = asyncHandler(async (req, res) => {
  let { email } = req.body;
  email = email?.toLowerCase().trim();

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.passwordResetOtp = hashedOtp;
  user.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  // ✅ FIX: Only log OTP in development — remove from production
  if (process.env.NODE_ENV !== "production") {
    console.log("RESET OTP (dev only):", otp);
  }

  // TODO: Send email in production
  await sendEmailFunc(email, "Reset Password", "", verificationEmail(user.name, otp));

  return res.status(200).json({ success: true, message: "Reset OTP sent successfully" });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = email?.toLowerCase().trim();
  password = password?.trim();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!user.isPasswordResetAllowed) {
    return res.status(403).json({ success: false, message: "OTP verification required before resetting password" });
  }

  user.password = password;
  user.isPasswordResetAllowed = false;
  await user.save();

  return res.status(200).json({ success: true, message: "Password reset successful" });
});

export const refresh_token = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No Refresh Token", error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
  } catch {
    return res.status(401).json({ message: "Invalid or expired refresh token", error: true });
  }

  const userId = decoded?.id;
  if (!userId) {
    return res.status(401).json({ message: "Invalid token payload", error: true });
  }

  const user = await userModel.findById(userId).select("+refreshTokens");
  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }

  const tokenExists = user.refreshTokens.some((item) => item.token === refreshToken);

  // ✅ FIX: Removed console.log of refresh tokens — security risk
  if (!tokenExists) {
    user.refreshTokens = [];
    await user.save();
    return res.status(403).json({
      message: "Refresh token reuse detected. Logged out from all devices.",
      error: true,
    });
  }

  const newAccessToken = await generateAccessToken(userId);
  const newRefreshToken = await generateRefreshToken(userId);

  user.refreshTokens = user.refreshTokens.filter((item) => item.token !== refreshToken);
  user.refreshTokens.push({ token: newRefreshToken });
  user.refreshTokens = user.refreshTokens.slice(-5);
  await user.save();

  res.cookie("refreshToken", newRefreshToken, getCookieOptions());

  return res.status(200).json({
    message: "Token Refreshed successfully.",
    success: true,
    data: { user: user.toJSON(), accessToken: newAccessToken },
  });
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }

  return res.status(200).json({ message: "User details", data: user, success: true });
});
