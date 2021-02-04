const WorkingWith = require('../../../../models/WorkingWith')
const toCapitalize = require('../../../services/Capitalize')

// Index of Work
const Index = async (req, res, next) => {
    try {
        const results = await WorkingWith.find().sort({ title: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Working area not found.'
            })
        }

        res.status(200).json({
            status: true,
            works: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Store Works
const Store = async (req, res, next) => {
    try {
        const { title } = req.body

        if (typeof title !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid title' })
        }

        // Check work available or not
        const exist = await WorkingWith.findOne({ 'title': toCapitalize(title) }).exec()
        if (exist) {
            return res.status(409).json({
                status: false,
                message: `${title} already exist`
            })
        }

        const newWork = new WorkingWith({ title: toCapitalize(title) })

        // Create new qualification
        const createWork = await newWork.save()
        if (!createWork) {
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