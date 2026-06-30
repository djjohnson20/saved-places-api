const Place = require("../models/place");
const { PLACE_STATUSES } = require("../constants/placeStatuses");

const createPlace = async (req, res, next) => {
  try {
    const { name, description, pictureUrl, isFavorite, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

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

    const place = await Place.create({
      name: name.trim(),
      description: description ? description.trim() : "",
      pictureUrl: pictureUrl ? pictureUrl.trim() : "",
      isFavorite,
      status,
      user: req.user.id,
    });

    res.status(201).json(place);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPlace };
