const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // do not return password by default
    },
    name: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords on login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.comparePassword(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
