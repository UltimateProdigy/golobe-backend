const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
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
			type: Date,
		},
		phoneNumber: {
			type: String,
			required: [true, "Phone Number is required"],
			unique: true,
		},
		booking: {
			type: Schema.Types.ObjectId,
			ref: "Booking",
		},
		card: {
			type: Schema.Types.ObjectId,
			ref: "Card",
		},
		refreshToken: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
