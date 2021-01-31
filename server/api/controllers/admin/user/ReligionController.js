const Religion = require('../../../../models/Religion')

// Religion index
const Index = async(req, res, next) => {
    try {
        const results = await Religion.find().sort({ name: 1 }).exec()
        if (!results.length) {
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
const Create = async(req, res, next) => {
    try {
        const { name } = req.body
        if (typeof name !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid name' })
        }

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

// Create Social Order
const CreateSocialOrder = async(req, res, next) => {
    try {
        const { religion, socialOrder } = req.body

        if (typeof socialOrder !== 'string') {
            res.status(400).json({ status: false, message: 'Enter valid name' })
        }

        // Find Religion
        const religionResult = await Religion.findOne({ 'name': religion }).exec()
        if (!religionResult) {
            res.status(404).json({
                status: false,
                message: 'Religion not found.'
            })
        }

        // Check order exist or not in found religion
        const isOrder = await religionResult.socialOrders.find(x => x.toLowerCase() === socialOrder.toLowerCase())
        if (isOrder) {
            return res.status(409).json({
                status: false,
                message: `${socialOrder} social order already created.`
            })
        }

        // Create new social order
        const createOrder = await Religion.updateOne({ 'name': religion }, { $push: { socialOrders: socialOrder } }, { new: true }).exec()
        if (!createOrder) {
            return res.status(501).json({
                status: false,
                message: 'Internel server error'
            })
        }

        res.status(201).json({
            status: true,
            message: `Successfully ${socialOrder} created.`
        })

    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}


module.exports = {
    Index,
    Create,
    CreateSocialOrder
}