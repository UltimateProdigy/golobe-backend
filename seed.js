const Hotel = require('./model/Hotel');
const City = require('./model/City');
const Country = require('./model/Country');

const seedDatabase = async () => {
    try {

        const [city, country] = await Promise.all([
            City.findOne({ name: "Lagos" }),
            Country.findOne({ name: "Nigeria" })
        ]);

        if (!city || !country) {
            throw new Error("Required city or country not found");
        }
        await Hotel.insertMany([
            {
                name: "AQUA Sanctum",
                overview: `The world's first five-star floating hotel, AQUA Sanctum drifts serenely in a private marine sanctuary 7 miles offshore. This revolutionary structure features 50 glass-bottomed villas suspended above a protected coral reef, offering 360-degree underwater views from every room. Guests arrive via private seaplane or our solar-powered hydrofoil shuttle. Marine biologists lead daily snorkeling safaris to the reef restoration project, while our Moon Deck offers the hemisphere's only floating astronomy observatory. The Michelin-starred 'Seven Fathoms' restaurant serves seafood so fresh it's selected by divers each morning from sustainable fish farms beneath the hotel. Wellness options include wave-powered thalassotherapy pools and meditation pods that submerge below the surface. Each villa has a retractable roof for stargazing and comes with a personal submarine for private exploration. The hotel generates 100% of its power through tidal turbines and has been awarded Platinum LEED certification for its zero-waste operations. Notable features include the world's deepest floating infinity pool (extending 12 meters below sea level) and an underwater art gallery visible from our spa's treatment rooms.`,
                cost: 2200,
                review: 4.9,
                amenities: [
                    "Glass-Bottom Villas",
                    "Private Submarines",
                    "Michelin-Starred Underwater Restaurant",
                    "Marine Biology Program",
                    "Wave-Powered Spa",
                    "Floating Astronomy Deck",
                    "Coral Reef Restoration Site"
                ],
                city: city._id,
                country: country._id
            },
            {
                name: "The Continental Express",
                overview: `Step aboard The Continental Express, where 32 meticulously restored train cars from the Golden Age of Rail have been transformed into luxurious stationary suites. Each carriage tells a different historical story - sleep in Winston Churchill's actual sleeping car from 1942 or the Orient Express dining car that once hosted Agatha Christie. Our 'Platform 9' features an authentic 1930s train station with working telegraph office and vintage luggage carts repurposed as cocktail tables. The Dining Car serves seven-course meals prepared in original coal-fired kitchens (now converted to induction), with staff in period uniforms. At night, the 'Jazz & Whiskey' observation car hosts live piano performances amidst walls lined with rare bourbons. Guests receive old-fashioned room keys and can request wake-up calls delivered by a porter with a pocket watch. The property includes a railway museum with interactive exhibits and a working model train that delivers after-dinner chocolates to each carriage. We've preserved every detail from brass luggage racks to steam whistle sound effects, while discreetly adding modern comforts like climate control and WiFi disguised as vintage radios.`,
                cost: 425,
                review: 4.7,
                amenities: [
                    "Historical Train Car Suites",
                    "Coal-Fired Fine Dining",
                    "Railway Museum Access",
                    "Jazz Observation Lounge",
                    "Period Costume Staff",
                    "Model Train Room Service",
                    "Vintage Telegraph Office"
                ],
                city: city._id,
                country: country._id
            }
        ]);

        console.log("Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

module.exports = seedDatabase