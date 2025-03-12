const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleCreateUser = async (req, res) => {
	const {
		email,
		password,
		firstName,
		lastName,
		address,
		dateOfBirth,
		phoneNumber,
	} = req.body;
	const userExists = await User.findOne({ email: email }).exec();
	if (userExists) return res.sendStatus(409);
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const result = await User.create({
			email,
			password: hashedPwd,
			firstName,
			lastName,
			address,
			dateOfBirth,
			phoneNumber,
		});
		console.log(result);
		res.status(201).json({ message: `Account Successfully Created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleCreateUser };
