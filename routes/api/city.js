const express = require("express");
const router = express.Router();
const { getAllCities } = require("../../controllers/locationController");

router.route("/city").get(getAllCities);

module.exports = router;
