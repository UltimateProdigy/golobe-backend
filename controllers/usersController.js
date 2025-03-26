const User = require("../model/User");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
    const { userId } = req.params
    const {
        email,
        password,
        firstName,
        lastName,
        address,
        dateOfBirth,
        phoneNumber
    } = req.body;

    const user = await User.find({ _id: userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        // Create update object with only provided fields
        const updateData = {};

        if (email) updateData.firstName = email;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (address) updateData.address = address;
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;

        if (password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            updateData.password = hashedPwd;
        }

        await User.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true } // Return the updated document
        );

        res.status(200).json({
            message: "User updated successfully",
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { editUser };