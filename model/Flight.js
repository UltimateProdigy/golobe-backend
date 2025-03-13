const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
	name: {
		type: String,
		ref: "User",
	},
});

module.exports = mongoose.model("Flight", flightSchema);
