const Hotels = require("../model/Hotel");

const allHotels = async (req, res) => {
	const hotels = await Hotels.find().populate("city").populate("country");
	if (!hotels) return res.status(204).json({ message: "No hotel found" });
	res.json(hotels);
};

module.exports = { allHotels };
