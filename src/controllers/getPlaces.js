const Place = require("../models/place");

const getPlaces = async (req, res, next) => {
  try {
    const { search, hasImage, page, limit } = req.query;

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

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const skip = (pageNumber - 1) * limitNumber;

    const total = await Place.countDocuments(query);

    const pages = Math.ceil(total / limitNumber);

    const places = await Place.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total,
      pages,
      places,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlaces };
