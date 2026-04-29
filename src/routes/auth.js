const express = require("express");
const { signup, login } = require("../controllers/auth");
const authRateLimiter = require("../middleware/authRateLimiter");

const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);

module.exports = router;
