const Booking = require("../model/Booking");

const userBookings = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId)
			return res.status(401).json({ message: "User ID is required" });
		const userBookings = await Booking.find({ user: userId })
			.populate("city")
			.populate("country")
			.populate("hotel")
			.populate("flight");
		res.json(userBookings);
	} catch (err) {
		res.status(500).json({ message: "Error fetching bookings" });
	}
};

const bookingDetails = async (req, res) => {
	try {
		const { bookingId } = req.params;
		const booking = await Booking.findOne({ _id: bookingId })
			.populate("city")
			.populate("country")
			.populate("hotel")
			.populate("flight");
		res.json(booking);
	} catch (err) {
		res.status(500).json({ error: "Error fetching booking details" });
	}
};

const createHotelBooking = async (req, res) => {
	try {
		const { user, city, country, hotel, checkIn, checkOut } = req.body;

		if (!hotel) return res.status(401).json({ message: 'hotelId is required for hotel booking' });
		if (!checkIn && !checkOut) return res.status(401).json({ message: 'Check In and Checkout Time is required for hotel booking' });

		const booking = await Booking.create({
			user, city, country, hotel, checkIn, checkOut, bookingType: 'hotel'
		});

		return res.status(201).json({
			message: "Hotel booking created successfully",
			id: booking.id,
			details: {
				createdAt: booking.createdAt,
				type: 'hotel'
			}
		});

	} catch (err) {
		console.error("Hotel booking error:", err);
		return res.status(400).json({
			message: "Hotel booking failed",
			error: err.message
		});
	}
};

const createPlaneBooking = async (req, res) => {
	try {
		const { user, city, country, flight } = req.body;

		if (!flight) return res.status(401).json({ message: 'flightId is required for flight booking' });

		const booking = await Booking.create({
			user, city, country, flight, bookingType: 'flight'
		});

		return res.status(201).json({
			message: "Flight booking created successfully",
			id: booking.id,
			details: {
				createdAt: booking.createdAt,
				type: 'flight'
			}
		});

	} catch (err) {
		console.error("Flight booking error:", err);
		return res.status(400).json({
			message: "Flight booking failed",
			error: err.message
		});
	}
};

module.exports = { userBookings, bookingDetails, createHotelBooking, createPlaneBooking };
