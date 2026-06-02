const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/places");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiters");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/places", apiLimiter, placeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Saved Places API is running",
    status: "ok",
  });
});

// test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

module.exports = app;
