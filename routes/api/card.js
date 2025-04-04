const express = require('express')
const router = express.Router();
const { getUserCards, addCard } = require('../../controllers/cardController')

router.route('/:userId').get(getUserCards)
router.route('/:userId').post(addCard)

module.exports = router