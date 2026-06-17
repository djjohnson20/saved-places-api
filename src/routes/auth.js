const express = require("express");
const { signup, login, getMe } = require("../controllers/auth");
const { loginLimiter, signupLimiter } = require("../middleware/rateLimiters");

const router = express.Router();
const protect = require("../middleware/auth");

router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);

module.exports = router;
