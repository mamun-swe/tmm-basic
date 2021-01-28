const Country = require('../../../../models/Country')
const toCapitalize = require('../../../services/Capitalize')

// Index of countries
const Index = async (req, res, next) => {
    try {
        const results = await Country.find().sort({ name: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Country not found.'
            })
        }

        res.status(200).json({
            status: true,
            countries: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Create Country
const Create = async (req, res, next) => {
    try {
        const { name } = req.body

        if (typeof name !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid name' })
        }

        // Check country available or not
        const country = await Country.findOne({ 'name': toCapitalize(name) }).exec()
        if (country) {
            return res.status(409).json({
                status: false,
                message: `${name} already exist`
            })
        }

        const newCountry = new Country({ name: toCapitalize(name) })

        // Create new country
        const createCountry = await newCountry.save()
        if (!createCountry) {
            return res.status(501).json({
                status: false,
                message: 'Internal server error'
            })
        }

        res.status(201).json({
            status: true,
            message: `Successfully ${name} created.`
        })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Create
}