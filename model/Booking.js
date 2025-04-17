const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        hotel: {
            type: String,
        },
        flight: {
            type: String,
        },
        flightDate: Date,
        takeOff: String,
        checkIn: Date,
        checkOut: Date,
        bookingType: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
