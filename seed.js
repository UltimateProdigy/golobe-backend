const Flight = require("./model/Flight");

const seedDatabase = async () => {
    try {
        await Flight.insertMany([
            {
                name: "Etihad Airways",
                reviews: 254,
                ratings: 4.8,
                cost: 700,
                remark: "Luxury at its finest.",
                departure: "2025-05-10T22:30:00",
                arrival: "2025-05-11T05:50:00",
                duration: "7h 20m",
            },
            {
                name: "Fly Dubai",
                reviews: 120,
                ratings: 4.5,
                cost: 250,
                remark: "Affordable and efficient.",
                departure: "2025-05-12T09:00:00",
                arrival: "2025-05-12T10:50:00",
                duration: "3h 50m",
            },
            {
                name: "Qatar Airways",
                reviews: 450,
                ratings: 4.9,
                cost: 1200,
                remark: "World-class service and comfort.",
                departure: "2025-06-15T23:00:00",
                arrival: "2025-06-16T06:00:00",
                duration: "14h 0m",
            },
            {
                name: "Emirates",
                reviews: 500,
                ratings: 5.0,
                cost: 1500,
                remark: "The best long-haul experience.",
                departure: "2025-07-01T03:30:00",
                arrival: "2025-07-01T22:00:00",
                duration: "13h 30m",
            },
        ]);

        console.log("Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

module.exports = seedDatabase;
