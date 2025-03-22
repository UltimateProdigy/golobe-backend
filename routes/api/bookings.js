const express = require("express");
const router = express.Router();
const {
	bookings,
	bookingDetails,
} = require("../../controllers/bookingsControllers");

router.route("/:userId/bookings").get(bookings);
router.route("/:userId/bookings/:bookingId").get(bookingDetails);

module.exports = router;
