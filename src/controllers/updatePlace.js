const Place = require("../models/place");
const mongoose = require("mongoose");
const { PLACE_STATUSES } = require("../constants/placeStatuses");

const updatePlace = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const { name, description, pictureUrl, isFavorite, status } = req.body;

    if (isFavorite !== undefined && typeof isFavorite !== "boolean") {
      return res.status(400).json({
        message: "isFavorite must be a boolean",
      });
    }

    if (status !== undefined && !PLACE_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Status must be want-to-visit or visited",
      });
    }

    const updates = {};

    if (name !== undefined) {
      updates.name = name.trim();
    }

    if (description !== undefined) {
      updates.description = description.trim();
    }

    if (pictureUrl !== undefined) {
      updates.pictureUrl = pictureUrl.trim();
    }

    if (isFavorite !== undefined) {
      updates.isFavorite = isFavorite;
    }

    if (status !== undefined) {
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const place = await Place.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updates,
      { returnDocument: "after", runValidators: true },
    );

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (err) {
    next(err);
  }
};

module.exports = { updatePlace };
