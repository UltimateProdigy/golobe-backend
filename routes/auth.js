const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/authController");

router.route("/").post(authenticateUser);

module.exports = router;
