const express = require("express");

const app = express();

// middleware
app.use(express.json());

// test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
