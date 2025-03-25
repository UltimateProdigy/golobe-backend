const bcrypt = require("bcrypt");
const crypto = require('crypto');
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const transporter = require('../config/emailConfig')

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


const refresh = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) return res.status(403).json({ message: "Forbidden" });
			const foundUser = await User.findOne({ email: decoded.email });
			const accessToken = jwt.sign(
				{ email: foundUser.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "4d" }
			);
			res.json({ accessToken });
		});
};


const logout = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.json({ message: "Cookie Cleared" });
};

const resetPassword = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ error: "Email is required" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(200).json({ message: "If this email exists, a reset link will be sent" });
		}
		const resetToken = crypto.randomBytes(32).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000;

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = resetTokenExpiry;
		await user.save();

		const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

		const mailOptions = {
			from: `<${process.env.EMAIL_FROM}>`,
			to: user.email,
			subject: 'Password Reset Request',
			text: `You requested a password reset. Click the link below:\n\n${resetUrl}\n\nThis link expires in 1 hour.`,
			html: `<p>You requested a password reset. Click the link below:</p>
				   <a href="${resetUrl}">Reset Password</a>
				   <p>This link expires in 1 hour.</p>`
		};

		await transporter.sendMail(mailOptions);
	} catch (err) {
		res.status(500).json({ message: err.message })
	}

}

module.exports = { login, refresh, logout, resetPassword };
