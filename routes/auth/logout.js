const express = require("express");
const router = express.Router();
const { logout } = require("../../controllers/authController");

router.route("/logout").post(logout);

module.exports = router;
