const Language = require('../../../../models/Language')
const toCapitalize = require('../../../services/Capitalize')

// Index of languages
const Index = async (req, res, next) => {
    try {
        const results = await Language.find({}, { name: 1 }).sort({ name: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Language not found.'
            })
        }

        res.status(200).json({
            status: true,
            languages: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Store Language
const Store = async (req, res, next) => {
    try {
        const { name } = req.body

        if (typeof name !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid name' })
        }

        // Check similar language available or not
        const similarLanguage = await Language.findOne({ 'name': toCapitalize(name) }).exec()
        if (similarLanguage) {
            return res.status(409).json({
                status: false,
                message: `${name} already exist`
            })
        }

        const newLanguage = new Language({ name: toCapitalize(name) })

        // Create new Language
        const createLanguage = await newLanguage.save()
        if (!createLanguage) {
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
    Store
}