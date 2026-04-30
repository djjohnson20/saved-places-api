const express = require("express");
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/places");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiters");

const app = express();

// middleware
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/places", apiLimiter, placeRoutes);

// test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

module.exports = app;
