const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone Number is required"],
	},
	refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
