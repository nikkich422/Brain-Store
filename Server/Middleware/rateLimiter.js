import rateLimit from 'express-rate-limit';

const jsonMessage = (msg) => ({
  handler: (req, res) => {
    res.status(429).json({ success: false, message: msg });
  }
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  ...jsonMessage('Too many login attempts. Please try again in 15 minutes.'),
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  ...jsonMessage('Too many OTP requests. Please try again later.'),
});

export const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  ...jsonMessage('Too many registration attempts. Please try again later.'),
});

export const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  ...jsonMessage('Too many requests. Please slow down.'),
});
