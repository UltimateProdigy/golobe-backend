const express = require("express");
const router = express.Router();
const { refresh } = require('../../controllers/authController')

router.route("/refresh").get(refresh);

module.exports = router;
