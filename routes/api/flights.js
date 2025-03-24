const express = require("express");
const router = express.Router();
const { allFlights } = require("../../controllers/flightsController");

router.route("/flights").get(allFlights);

module.exports = router;
