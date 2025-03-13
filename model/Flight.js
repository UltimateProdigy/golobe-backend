const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
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
});

module.exports = mongoose.model("Flight", flightSchema);
