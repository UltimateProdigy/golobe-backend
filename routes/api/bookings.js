const express = require("express");
const router = express.Router();
const {
	userBookings,
	bookingDetails,
	createHotelBooking,
	createPlaneBooking
} = require("../../controllers/bookingsControllers");

router.route("/:userId/bookings").get(userBookings);
router.route("/:userId/bookings/:bookingId").get(bookingDetails);
router.route("/booking/hotel").post(createHotelBooking);
router.route("/booking/flight").post(createPlaneBooking)


module.exports = router;
