const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
	remark: {
		type: String,
		required: true
	},
	departure: {
		type: String,
		required: true
	},
	arrival: {
		type: String,
		required: true
	},
	duration: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Flight", flightSchema);
