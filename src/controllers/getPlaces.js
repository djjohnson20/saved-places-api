const Place = require("../models/place");
const { PLACE_STATUSES } = require("../constants/placeStatuses");

const getPlaces = async (req, res, next) => {
  try {
    const { search, hasImage, favorite, status, page, limit } = req.query;

    const query = { user: req.user.id };

    if (status !== undefined && !PLACE_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Status must be want-to-visit or visited",
      });
    }

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

    if (favorite === "true") {
      query.isFavorite = true;
    }

    if (favorite === "false") {
      query.isFavorite = false;
    }

    if (status !== undefined) {
      query.status = status;
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
