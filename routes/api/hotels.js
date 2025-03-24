const express = require("express");
const router = express.Router();
const { allHotels } = require("../../controllers/hotelsController");

router.route("/hotels").get(allHotels);

module.exports = router;
