const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cityId: {
            type: Schema.Types.ObjectId,
            ref: "City",
            required: true,
        },
        countryId: {
            type: Schema.Types.ObjectId,
            ref: "Country",
            required: true,
        },
        hotelId: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
        },
        flightId: {
            type: Schema.Types.ObjectId,
            ref: "Flight",
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
