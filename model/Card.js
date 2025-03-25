const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 16
    },
    expDate: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4
    },
    cardName: {
        type: String,
        required: true,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);