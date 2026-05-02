const Place = require("../models/place");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlaceById };
