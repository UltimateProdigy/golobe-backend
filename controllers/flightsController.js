const Flights = require("../model/Flight");

const allFlights = async (req, res) => {
    const flights = await Flights.find();
    if (!flights) return res.status(204).json({ message: "No flight found" });
    res.json(flights);
};

const getFlight = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Flight ID is required" });

    const flight = await Flights.findOne({ _id: id });
	res.json(flight)
};

module.exports = { allFlights, getFlight };
