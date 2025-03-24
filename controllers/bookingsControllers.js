const Booking = require("../model/Booking");

const userBookings = async (req, res) => {
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
		res.status(500).json({ error: "Error fetching booking details" });
	}
};

const createHotelBooking = async (req, res) => {
	try {
		const { userId, cityId, countryId, hotelId } = req.body;

		if (!hotelId) throw new Error('hotelId is required for hotel booking');

		const booking = await Booking.create({
			userId, cityId, countryId, hotelId
		});

		return res.status(201).json({
			message: "Hotel booking created successfully",
			id: booking._id,
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
		const { userId, cityId, countryId, flightId } = req.body;

		if (!flightId) throw new Error('flightId is required for flight booking');

		const booking = await Booking.create({
			userId, cityId, countryId, flightId
		});

		return res.status(201).json({
			message: "Flight booking created successfully",
			id: booking._id,
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
