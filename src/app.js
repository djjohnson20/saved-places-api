const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(express.json());
app.use("/auth", authRoutes);

// test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
