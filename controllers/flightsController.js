const Flights = require("../model/Flight");

// const allFlights = async (req, res) => {
//     const flights = await Flights.find();
//     if (!flights) return res.status(204).json({ message: "No flight found" });
//     res.json(flights);
// };

const Amadeus = require("amadeus");
const NodeCache = require("node-cache");

const flightCache = new NodeCache({ stdTTL: 3600 });

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const allFlights = async (req, res) => {
    try {
        const { origin, destination, departureDate, adults } = req.query;
        if (
            !origin ||
            !destination ||
            !departureDate ||
            !adults ||
            typeof origin !== "string" ||
            typeof destination !== "string" ||
            typeof departureDate !== "string" ||
            isNaN(parseInt(adults))
        ) {
            return res.status(400).json({
                error: "Origin, destination, departureDate, and adults are required and must be valid",
            });
        }

        // Validate IATA codes (basic check for 3-letter codes)
        if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
            return res.status(400).json({
                error: "Origin and destination must be valid 3-letter IATA codes",
            });
        }

        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
            return res.status(400).json({
                error: "departureDate must be in YYYY-MM-DD format",
            });
        }

        const adultsNum = parseInt(adults);
        if (adultsNum < 1) {
            return res.status(400).json({
                error: "At least one adult is required",
            });
        }
        const cacheKey =
            `flights-${origin}-${destination}-${departureDate}-${adults}`.toLowerCase();
        const cachedFlights = flightCache.get(cacheKey);
        if (cachedFlights) {
            return res.json(cachedFlights);
        }
        let flightResponse;
        try {
            flightResponse = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate,
                adults: adultsNum,
                max: 10,
            });
        } catch (err) {
            console.error(
                `Error fetching flights for ${origin} to ${destination}:`,
                err.response?.data || err.message
            );
            return res.status(400).json({
                error: "No flights found for the specified route or date",
            });
        }

        // Validate flight response
        if (!flightResponse?.data || !Array.isArray(flightResponse.data)) {
            return res
                .status(404)
                .json({ error: "No flights available for this route or date" });
        }

        const flights = flightResponse.data.map((flight) => ({
            id:
                flight.id ||
                `flight-${Math.random().toString(36).substr(2, 9)}`,
            airline:
                flight.itineraries[0]?.segments[0]?.carrierCode || "Unknown",
            departure: {
                airport:
                    flight.itineraries[0]?.segments[0]?.departure?.iataCode ||
                    "Unknown",
                time:
                    flight.itineraries[0]?.segments[0]?.departure?.at ||
                    "Unknown",
            },
            arrival: {
                airport:
                    flight.itineraries[0]?.segments[0]?.arrival?.iataCode ||
                    "Unknown",
                time:
                    flight.itineraries[0]?.segments[0]?.arrival?.at ||
                    "Unknown",
            },
            duration: flight.itineraries[0]?.duration || "Unknown",
            price: flight.price?.total
                ? `${flight.price.currency} ${flight.price.total}`
                : "Price on request",
            cabin:
                flight.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin ||
                "Unknown",
        }));

        flightCache.set(cacheKey, flights);

        return res.json(flights);
    } catch (err) {
        console.error(
            "Unexpected error in allFlights:",
            err.message,
            err.stack
        );
        return res.status(500).json({
            error: "Failed to fetch flights due to an internal error",
        });
    }
};

module.exports = { allFlights };

const getFlight = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Flight ID is required" });

    const flight = await Flights.findOne({ _id: id });
    res.json(flight);
};

module.exports = { allFlights, getFlight };
