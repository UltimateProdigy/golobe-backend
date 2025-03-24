const Country = require("../model/Country");
const City = require('../model/City')

const getAllCountries = async (req, res) => {
    const countries = await Country.find();
    if (!countries) return res.status(204).json({ message: "No Country found" });
    res.json(countries);
};

const getAllCities = async (req, res) => {
    const cities = await City.find();
    if (!cities) return res.status(204).json({ message: "No City found" });
    res.json(cities);
};

module.exports = { getAllCountries, getAllCities };
