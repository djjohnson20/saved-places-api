const Place = require("../models/place");

const getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({ user: req.user.id });

    res.json(places);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlaces };
