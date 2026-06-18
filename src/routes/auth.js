const express = require("express");
const {
  signup,
  login,
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/auth");
const { loginLimiter, signupLimiter } = require("../middleware/rateLimiters");

const router = express.Router();
const protect = require("../middleware/auth");

router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.patch("/change-password", protect, changePassword);

module.exports = router;
