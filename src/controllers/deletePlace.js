const Place = require("../models/place");

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params;

    const place = await Place.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { deletePlace };
