const Flights = require("../model/Flight");

const allFlights = async (req, res) => {
	const flights = await Flights.find();
	if (!flights) return res.status(204).json({ message: "No flight found" });
	res.json(flights);
};

module.exports = { allFlights };
