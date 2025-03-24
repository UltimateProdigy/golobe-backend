const express = require("express");
const router = express.Router();
const { allHotels } = require("../../controllers/hotelsController");

router.route("/").get(allHotels);

module.exports = router;
