const rateLimit = require("express-rate-limit");

// Login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many login attempts, please try again later.",
  },
});

// Signup limiter
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many signup attempts, please try again later.",
  },
});

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    message: "Too many requests, please slow down.",
  },
});

module.exports = {
  loginLimiter,
  signupLimiter,
  apiLimiter,
};
