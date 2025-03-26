const express = require("express");
const router = express.Router();
const { editUser } = require("../../controllers/usersController");

router.route("/:userId").put(editUser);

module.exports = router;
