const Religion = require('../../../models/Religion')

// Religion index
const Index = async (req, res, next) => {
    try {
        const results = await Religion.find().exec()
        if (!results) {
            return res.status(404).json({
                status: false,
                message: 'Religion not found.'
            })
        }

        res.status(200).json({
            status: true,
            religions: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Create Religion
const Create = async (req, res, next) => {
    try {
        const { name } = req.body

        // Check If exist
        const checkReligion = await Religion.findOne({ name: name }).exec()

        if (checkReligion) {
            return res.status(409).json({
                status: false,
                message: 'This religion already created.'
            })
        }

        const newReligion = new Religion({ name: name })

        // Create religion
        await newReligion.save()

        res.status(201).json({
            status: true,
            message: `Successfully ${name} religion created`
        })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Create
}