const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	city: {
		type: Schema.Types.ObjectId,
		ref: "City",
		required: true,
	},
	country: {
		type: Schema.Types.ObjectId,
		ref: "Country",
		required: true,
	},
	hotel: {
		type: Schema.Types.ObjectId,
		ref: "Hotel",
		required: true,
	},
	flight: {
		type: Schema.Types.ObjectId,
		ref: "Flight",
		required: true,
	},
});

module.exports = mongoose.model("Booking", bookingSchema);
