import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"]
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local"; // only required for normal login
      },
      select: false
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          return v === null || /^\d{10}$/.test(v);
        },
        message: "Please use valid mobile number"
      }
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
    lastLoginDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    emailVerificationOtp: {
      type : String,
      default: null,
      select: false,
    },
    emailVerificationOtpExpires: {
      type: Date,
      default: null,
    },
    passwordResetOtp: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetOtpExpires: {
      type: Date,
      default: null,
    },
    otpLastSentAt: {
      type: Date,
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },
    isPasswordResetAllowed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
    // It will handle res.json sensitive fields
    toJSON:{
      transform: function (doc, ret){
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.emailVerificationOtp;
        delete ret.emailVerificationOtpExpires;
        delete ret.passwordResetOtp;
        delete ret.passwordResetOtpExpires;
        delete ret.otpLastSentAt;
        delete ret.__v;
  
        return ret;
      }
    } 
  }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.addRefreshToken = function (token) {
  this.refreshTokens.push({token});

  if(this.refreshTokens.length > 5){
    this.refreshTokens.shift();
  }

  return this.save();
}

userSchema.methods.removeRefreshToken = function (token) {
  this.refreshTokens = this.refreshTokens.filter(
    (t) => t.token !== token
  );

  return this.save({ validateBeforeSave: false });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("User", userSchema);
export default userModel;
