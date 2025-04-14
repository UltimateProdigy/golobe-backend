const Country = require("../model/Country");
const City = require("../model/City");
const { countries } = require("countries-list");

const getAllCountries = async (req, res) => {
    // const countries = await Country.find();
    try {
        const countryList = Object.values(countries).map((c) => ({
            name: c.name,
            iso2: c.iso2,
            iso3: c.iso3,
            currency: c.currency,
            capital: c.capital,
            continent: c.continent
        }));
        if (!countryList)
            return res.status(204).json({ message: "No Country found" });
        res.json(countryList);
    } catch (err) {
        console.error(err);
    }
};

const getAllCities = async (req, res) => {
    const cities = await City.find().populate("country");
    if (!cities) return res.status(204).json({ message: "No City found" });
    res.json(cities);
};

module.exports = { getAllCountries, getAllCities };
