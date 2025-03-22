const Booking = require("../model/Booking");

const bookings = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId)
			return res.status(401).json({ message: "User ID is required" });
		const userBookings = await Booking.find({ userId })
			.populate("cityId")
			.populate("countryId")
			.populate("hotelId")
			.populate("flightId");
		res.json(userBookings);
	} catch (err) {
		res.status(500).json({ message: "Error fetching bookings" });
	}
};

const bookingDetails = async (req, res) => {
	try {
		const { userId, bookingId } = req.params;
		const booking = await Booking.findOne({ userId, _id: bookingId })
			.populate("cityId")
			.populate("countryId")
			.populate("hotelId")
			.populate("flightId");
		res.json(booking);
	} catch (err) {
		res.status(500).json({ message: "Error fetching booking details" });
	}
};

module.exports = { bookings, bookingDetails };
