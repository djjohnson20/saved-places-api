const express = require("express");
const protect = require("../middleware/auth");
const { createPlace } = require("../controllers/createPlace");

const router = express.Router();

router.post("/", protect, createPlace);

module.exports = router;
