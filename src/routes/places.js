const express = require("express");
const protect = require("../middleware/auth");
const { createPlace } = require("../controllers/createPlace");
const { getPlaces } = require("../controllers/getPlaces");

const router = express.Router();

router.post("/", protect, createPlace);
router.get("/", protect, getPlaces);

module.exports = router;
