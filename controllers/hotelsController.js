const Hotels = require("../model/Hotel");

const allHotels = async (req, res) => {
	const hotels = await Hotels.find().populate("cityId").populate("countryId");
	if (!hotels) return res.status(204).json({ message: "No hotel found" });
	res.json(hotels);
};

module.exports = { allHotels };
