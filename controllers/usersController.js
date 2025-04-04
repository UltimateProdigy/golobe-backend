const User = require("../model/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
            .select("-password -refreshToken")
            .populate("card")
            .populate("booking");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

const editUser = async (req, res) => {
    const { userId } = req.params;
    const {
        email,
        password,
        firstName,
        lastName,
        address,
        dateOfBirth,
        phoneNumber,
    } = req.body;

    const user = await User.find({ _id: userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const updateData = {};

        if (email) updateData.email = email;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (address) updateData.address = address;
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;

        if (password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            updateData.password = hashedPwd;
        }

        await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });

        res.status(200).json({
            message: "User updated successfully",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { editUser, getUser };
