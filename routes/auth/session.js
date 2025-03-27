const express = require("express");
const router = express.Router();
const { session } = require('../../controllers/authController')
const { verifyJWT } = require('../../middleware/verifyJWT')

router.route("/").get(verifyJWT, session);

module.exports = router;
