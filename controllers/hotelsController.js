const Amadeus = require("amadeus");
const NodeCache = require("node-cache");

const hotelCache = new NodeCache({ stdTTL: 3600 });

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const allHotels = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city || typeof city !== "string") {
            return res.status(400).json({
                error: "City parameter is required and must be a string",
            });
        }

        const cacheKey = `hotels-${city.toLowerCase()}`;

        const cachedHotels = hotelCache.get(cacheKey);
        if (cachedHotels) {
            return res.json(cachedHotels);
        }

        const cityCodeResponse = await amadeus?.referenceData?.locations.get({
            keyword: city,
            subType: "CITY",
        });

        const cityCode = cityCodeResponse.data[0]?.iataCode;
        if (!cityCode) {
            res.status(401).json({ message: "City not found" });
        }

        const hotelsResponse =
            await amadeus?.referenceData?.locations?.hotels?.byCity?.get({
                cityCode: cityCode,
            });

        const hotels = hotelsResponse.data.map((hotel) => ({
            name: hotel.name,
            images: hotel.media?.urls?.map((url) => ({ url })) || [],
            amenities: [hotel.amenities],
            ratings: [hotel.ratings],
            price: hotel.offers?.price?.total || "Price on request",
        }));

        hotelCache.set(cacheKey, hotels);

        res.json(hotels);
    } catch (err) {
        console.error("Hotel API error:", err);
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
};

module.exports = { allHotels };
