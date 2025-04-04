const Card = require("../model/Card");
const User = require("../model/User");

const addCard = async (req, res) => {
    const { userId } = req.params;
    const { cardNumber, expDate, cvc, cardName } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingCard = await Card.findOne({ userId, cardNumber });
        if (existingCard) {
            return res
                .status(409)
                .json({ message: "Card already exists for this user" });
        }
        const newCard = new Card({
            userId,
            cardNumber,
            expDate,
            cvc,
            cardName,
        });
        await newCard.save();

        res.status(201).json({
            message: "Card added successfully",
            card: {
                id: newCard._id,
                cardName: newCard.cardName,
                last4: newCard.cardNumber,
                expDate: newCard.expDate,
            },
        });
    } catch (err) {
        console.error("Error adding card:", err);
        res.status(500).json({
            message: "Failed to add card",
            error: err.message,
        });
    }
};

const getUserCards = async (req, res) => {
    const { userId } = req.params;
    const card = await Card.find({ userId: userId });
    if (!card) res.status(401).json({ message: "No Card for user" });
    res.status(201).json(card);
};

module.exports = { addCard, getUserCards };
