const Users = require('../../../../models/Users')
const BasicAndLifestyle = require('../../../../models/BasicAndLifestyle')

// Store basic & lifestyle info for an user
const Store = async (req, res, next) => {
    try {
        const {
            email,
            age,
            materialStatus,
            height,
            bodyWeight,
            diet,
            bloodGroup,
            healthInformation,
            disability
        } = req.body

        // Find user already exist or not
        const existUser = await BasicAndLifestyle.findOne({ 'user': email }).exec()

        const newBasicAndLifestyle = new BasicAndLifestyle({
            user: email,
            age: age,
            materialStatus: materialStatus,
            height: height,
            bodyWeight: bodyWeight,
            diet: diet,
            bloodGroup: bloodGroup,
            healthInformation: healthInformation,
            disability: disability
        })

        if (!existUser) {

            // Create new information
            const createInformation = await newBasicAndLifestyle.save()
            if (!createInformation) {
                return res.status(501).json({
                    status: false,
                    message: 'Internat server error'
                })
            }

            // Find registered user from users collection and update
            const updateUser = await Users.findOneAndUpdate(
                { 'email': email },
                { $set: { 'basicAndLifestyleInformation': createInformation._id } },
                { new: true }
            ).exec()

            if (!updateUser) {
                return res.status(501).json({
                    status: false,
                    message: 'Internal server error'
                })
            }

            res.status(201).json({
                status: true,
                message: 'Successfully basic & lifestyle information created.'
            })
        }

        // if user already added her/his information
        const updateExistUserInfo = await BasicAndLifestyle.findOneAndUpdate(
            { user: email },
            { $set: req.body },
            { new: true }
        ).exec()

        if (!updateExistUserInfo) {
            return res.status(501).json({
                status: false,
                message: 'Internal server error'
            })
        }
        res.status(201).json({
            status: true,
            message: 'Successfully basic & lifestyle information created.'
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = {
    Store
}