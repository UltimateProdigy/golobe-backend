const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	overview: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
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

module.exports = mongoose.model("Hotel", hotelSchema);
