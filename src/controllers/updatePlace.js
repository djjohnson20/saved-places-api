const Place = require("../models/place");

const updatePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, pictureUrl } = req.body;

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
