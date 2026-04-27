const Place = require("../models/place");

const getPlaces = async (req, res, next) => {
  try {
    const { search, hasImage } = req.query;

    const query = { user: req.user.id };

    if (search && search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (hasImage === "true") {
      query.pictureUrl = { $ne: "" };
    }

    if (hasImage === "false") {
      query.pictureUrl = "";
    }

    const places = await Place.find(query).sort({
      createdAt: -1,
    });

    res.json(places);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlaces };
