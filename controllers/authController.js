const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email }).exec();
	if (!user) return res.status(400).json({ message: "User does not exist" });

	const validPassword = await bcrypt.compare(password, user.password);
	if (validPassword) {
		const accessToken = jwt.sign(
			{
				email: user.email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);
		const refreshToken = jwt.sign(
			{ email: user.email },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "7d" }
		);

		user.refreshToken = refreshToken;
		await user.save();

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
        console.log(user)
		res.json({
			message: "User is logged in!",
			firstName: user.firstName,
			lastName: user.lastName,
			accessToken,
		});
	} else {
		res.status(401).json({ message: "Incorrect Password" });
	}
};

module.exports = { authenticateUser };
