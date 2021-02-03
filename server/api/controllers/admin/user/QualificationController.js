const Qualification = require('../../../../models/Qualification')
const toCapitalize = require('../../../services/Capitalize')

// Index of qualifications
const Index = async (req, res, next) => {
    try {
        const results = await Qualification.find().sort({ title: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Qualification not found.'
            })
        }

        res.status(200).json({
            status: true,
            qualifications: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Store qualification
const Store = async (req, res, next) => {
    try {
        const { title } = req.body

        if (typeof title !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid title' })
        }

        // Check qualification available or not
        const exist = await Qualification.findOne({ 'title': toCapitalize(title) }).exec()
        if (exist) {
            return res.status(409).json({
                status: false,
                message: `${title} already exist`
            })
        }

        const newQualification = new Qualification({ title: toCapitalize(title) })

        // Create new qualification
        const createQualification = await newQualification.save()
        if (!createQualification) {
            return res.status(501).json({
                status: false,
                message: 'Internal server error'
            })
        }

        res.status(201).json({
            status: true,
            message: `Successfully ${title} created.`
        })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Store
}