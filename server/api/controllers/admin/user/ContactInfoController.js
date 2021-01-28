const Users = require('../../../../models/Users')
const ContactInfo = require('../../../../models/ContactInfo')

// Store user contact info
const Store = async (req, res, next) => {
    try {
        const {
            email,
            contactPersonName,
            relationship,
            presentAddress,
            permanentAddress,
            nidNumber,
            passportNumber,
            phoneNumber,
            altPhone,
            convenientTimeToCall
        } = req.body


        // Find user already exist or not
        const existUser = await ContactInfo.findOne({ 'user': email }).exec()

        const newContactInfo = new ContactInfo({
            user: email,
            contactPersonName: contactPersonName,
            relationship: relationship,
            presentAddress: presentAddress,
            permanentAddress: permanentAddress,
            nidNumber: nidNumber,
            passportNumber: passportNumber,
            phoneNumber: phoneNumber,
            altPhone: altPhone,
            convenientTimeToCall: convenientTimeToCall
        })

        if (!existUser) {

            // Create new contact information
            const createContactInformation = await newContactInfo.save()
            if (!createContactInformation) {
                return res.status(501).json({
                    status: false,
                    message: 'Internat server error'
                })
            }

            // Find registered user from users collection and update
            const updateUser = await Users.findOneAndUpdate(
                { 'email': email },
                { $set: { 'contactInformation': createContactInformation._id } },
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
        const updateExistUserInfo = await ContactInfo.findOneAndUpdate(
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
            message: 'Successfully basic & lifestyle information updated.'
        })


    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Store
}