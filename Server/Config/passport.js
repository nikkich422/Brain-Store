import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../Utils/tokens.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await userModel.findOne({ email });

        if (!user) {
          user = await userModel.create({
            name: profile.displayName,
            email,
            avatar: profile.photos[0].value,
            isEmailVerified: true,
            provider: "google",
          });
        }

        const accessTokenJWT = await generateAccessToken(user._id);
        const refreshTokenJWT = await generateRefreshToken(user._id);

        await user.addRefreshToken(refreshTokenJWT);

        return done(null, {
          user,
          accessToken: accessTokenJWT,
          refreshToken: refreshTokenJWT,
        });

      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
