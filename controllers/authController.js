const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

// @desc Login
// @route GET /auth
const login = async (req, res) => {
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
			secure: true,
			sameSite: "None",
			maxAge: 24 * 60 * 60 * 1000,
		});
		console.log(user);
		res.json({
			message: "User is logged in!",
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			accessToken,
		});
	} else {
		res.status(401).json({ message: "Incorrect Password" });
	}
};

// @desc Refresh
// @route GET /auth/refresh

// TODO: Install Async Handler from Express Async Handler

const refresh = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		asyncHandler(async (err, decoded) => {
			if (err) return res.status(403).json({ message: "Forbidden" });
			const foundUser = await User.findOne({ email: decoded.email });
			const accessToken = jwt.sign(
				{ email: foundUser.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "4d" }
			);
			res.json({ accessToken });
		})
	);
};

// @desc Logout
// @route POST /auth/logout
const logout = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.json({ message: "Cookie Cleared" });
};

module.exports = { login, refresh, logout };
