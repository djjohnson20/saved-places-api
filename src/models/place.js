const mongoose = require("mongoose");
const { PLACE_STATUSES } = require("../constants/placeStatuses");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    pictureUrl: {
      type: String,
      default: "",
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: PLACE_STATUSES,
      default: "want-to-visit",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Place", placeSchema);
