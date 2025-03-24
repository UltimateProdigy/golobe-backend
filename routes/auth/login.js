const express = require("express");
const router = express.Router();
const loginLimiter = require("../../middleware/loginLimiter");
const { login } = require("../../controllers/authController");

router.route("/login").post(loginLimiter, login);

module.exports = router;
