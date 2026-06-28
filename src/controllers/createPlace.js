const Place = require("../models/place");

const createPlace = async (req, res, next) => {
  try {
    const { name, description, pictureUrl, isFavorite } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (isFavorite !== undefined && typeof isFavorite !== "boolean") {
      return res.status(400).json({
        message: "isFavorite must be a boolean",
      });
    }

    const place = await Place.create({
      name: name.trim(),
      description: description ? description.trim() : "",
      pictureUrl: pictureUrl ? pictureUrl.trim() : "",
      isFavorite,
      user: req.user.id,
    });

    res.status(201).json(place);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPlace };
