const express = require("express");
const router = express.Router();
const { getAllCountries } = require("../../controllers/locationController");

router.route("/country").get(getAllCountries);

module.exports = router;
