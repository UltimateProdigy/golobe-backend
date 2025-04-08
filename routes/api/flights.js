const express = require("express");
const router = express.Router();
const { allFlights, getFlight } = require("../../controllers/flightsController");

router.route("/").get(allFlights);
router.route("/:id").get(getFlight);

module.exports = router;
