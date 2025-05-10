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

        const hotelsResponse =
            await amadeus.referenceData.locations.hotels.byCity.get({
                cityCode: city.toUpperCase()
            });

        if (!hotelsResponse.data) {
            return res.status(404).json({
                error: "No hotels found for this city",
            });
        }
        const hotels = hotelsResponse.data.map((hotel) => ({
            id: hotel.hotelId || hotel.id,
            name: hotel.name,
            address: hotel.address,
            images: hotel.media?.urls?.map((url) => ({ url })) || [],
            amenities: hotel.amenities || [],
            rating: hotel.rating || null,
            price: hotel.offers?.price?.total || "Price on request",
            latitude: hotel.geoCode?.latitude,
            longitude: hotel.geoCode?.longitude,
        }));

        hotelCache.set(cacheKey, hotels);

        return res.json(hotels);
    } catch (err) {
        console.error("Hotel API error:", err);

        if (err.response) {
            return res.status(err.response.statusCode || 500).json({
                error: err.description || "Amadeus API error",
            });
        }
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};

module.exports = { allHotels };
