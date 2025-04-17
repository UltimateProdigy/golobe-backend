const Booking = require("../model/Booking");

const userBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId)
            return res.status(401).json({ message: "User ID is required" });
        const userBookings = await Booking.find({ userId })
        res.json(userBookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

const bookingDetails = async (req, res) => {
    try {
        const { bookingId, userId } = req.params;
        const booking = await Booking.findOne({ _id: bookingId, userId })
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: "Error fetching booking details" });
    }
};

const createHotelBooking = async (req, res) => {
    try {
        const { user, city, hotel, checkIn, checkOut } = req.body;

        if (!hotel)
            return res
                .status(401)
                .json({ message: "hotel is required for hotel booking" });
        if (!checkIn && !checkOut)
            return res.status(401).json({
                message:
                    "Check In and Checkout Time is required for hotel booking",
            });

        const booking = await Booking.create({
            user,
            city,
            hotel,
            checkIn,
            checkOut,
            bookingType: "hotel",
        });

        return res.status(201).json({
            message: "Hotel booking created successfully",
            id: booking.id,
            details: {
                createdAt: booking.createdAt,
                type: "hotel",
            },
        });
    } catch (err) {
        console.error("Hotel booking error:", err);
        return res.status(400).json({
            message: "Hotel booking failed",
            error: err.message,
        });
    }
};

const createPlaneBooking = async (req, res) => {
    try {
        const { user, city, flight, takeOff, flightDate } = req.body;

        if (!flight)
            return res
                .status(401)
                .json({ message: "flight is required for flight booking" });

        const booking = await Booking.create({
            user,
            city,
            flight,
            bookingType: "flight",
            takeOff,
            flightDate,
        });

        return res.status(201).json({
            message: "Flight booking created successfully",
            id: booking.id,
            details: {
                createdAt: booking.createdAt,
                type: "flight",
            },
        });
    } catch (err) {
        console.error("Flight booking error:", err);
        return res.status(400).json({
            message: "Flight booking failed",
            error: err.message,
        });
    }
};

module.exports = {
    userBookings,
    bookingDetails,
    createHotelBooking,
    createPlaneBooking,
};
