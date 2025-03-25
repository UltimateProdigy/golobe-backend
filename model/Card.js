const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true
    },
    expDate: {
        type: Date,
        required: true,
    },
    cvc: {
        type: Number,
        required: true,
    },
    cardName: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Card", cardSchema);
