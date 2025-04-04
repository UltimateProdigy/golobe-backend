const express = require("express");
const router = express.Router();
const { editUser, getUser } = require("../../controllers/usersController");

router.route("/:userId").get(getUser).put(editUser);

module.exports = router;
