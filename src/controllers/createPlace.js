const Place = require("../models/place");

const createPlace = async (req, res, next) => {
  try {
    const { name, description, pictureUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const place = await Place.create({
      name: name.trim(),
      description: description ? description.trim() : "",
      pictureUrl: pictureUrl ? pictureUrl.trim() : "",
      user: req.user.id,
    });

    res.status(201).json(place);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPlace };
