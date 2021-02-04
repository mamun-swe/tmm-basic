const ProfessionArea = require('../../../../models/ProfessionArea')
const toCapitalize = require('../../../services/Capitalize')

// Index of Profession area
const Index = async (req, res, next) => {
    try {
        const results = await ProfessionArea.find().sort({ title: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Profession area not found.'
            })
        }

        res.status(200).json({
            status: true,
            professions: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Store Profession area
const Store = async (req, res, next) => {
    try {
        const { title } = req.body

        if (typeof title !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid title' })
        }

        // Check work available or not
        const exist = await ProfessionArea.findOne({ 'title': toCapitalize(title) }).exec()
        if (exist) {
            return res.status(409).json({
                status: false,
                message: `${title} already exist`
            })
        }

        const newProfession = new ProfessionArea({ title: toCapitalize(title) })

        // Create new profession
        const createProfession = await newProfession.save()
        if (!createProfession) {
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

