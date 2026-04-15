require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
