const Branch = require('../../../../models/Branch')


// Index of branch
const Index = async (req, res, next) => {
    try {
        const results = await Branch.find({ isActive: true }).sort({ name: 1 }).exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Branch not found.'
            })
        }

        res.status(200).json({
            status: true,
            branches: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Store new branch
const Store = async (req, res, next) => {
    try {
        const { name, country, city, address, isActive } = req.body

        // Find simiral branch
        const similarBranch = await Branch.findOne({
            $and: [
                { 'name': name },
                { 'country': country },
                { 'city': city },
                { 'address': address }
            ]
        }).exec()

        if (similarBranch) {
            return res.status(409).json({
                status: false,
                message: 'Similar branch already created.'
            })
        }

        const newBranch = new Branch({
            name: name,
            country: country,
            city: city,
            address: address,
            isActive: isActive
        })

        await newBranch.save()
        res.status(201).json({
            status: true,
            message: `Successfully ${name} brance created.`
        })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Store
}