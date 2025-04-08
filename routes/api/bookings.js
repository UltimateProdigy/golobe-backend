const express = require("express");
const router = express.Router();
const {
	userBookings,
	bookingDetails,
	createHotelBooking,
	createPlaneBooking
} = require("../../controllers/bookingsControllers");

router.route("/user/:userId").get(userBookings);
router.route("/:bookingId/user/:userId").get(bookingDetails);
router.route("/hotel").post(createHotelBooking);
router.route("/flight").post(createPlaneBooking)


module.exports = router;
