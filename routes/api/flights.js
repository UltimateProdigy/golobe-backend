const express = require("express");
const router = express.Router();
const { allFlights } = require("../../controllers/flightsController");

router.route("/").get(allFlights);

module.exports = router;
