const express = require("express");
const { signup, login } = require("../controllers/auth");
const { loginLimiter, signupLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);

module.exports = router;
