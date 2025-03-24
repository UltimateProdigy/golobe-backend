const mongoose = require("mongoose");
const { Schema } = mongoose;

const countrySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	iso: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Country", countrySchema);
