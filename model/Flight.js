const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    cost: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Flight", flightSchema);
