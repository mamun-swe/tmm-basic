const { Schema, model } = require("mongoose")

const contactInfoSchema = new Schema({
    user: {
        type: String,
        ref: 'User'
    },
    contactPersonName: {
        type: String,
        trim: true,
        required: true,
    },
    relationship: {
        type: String,
        trim: true,
        required: true,
    },
    presentAddress: {
        type: String,
        trim: true,
        required: true,
    },
    permanentAddress: {
        type: String,
        trim: true,
        required: true,
    },
    nidNumber: {
        type: String,
        trim: true,
        default: null
    },
    passportNumber: {
        type: String,
        trim: true,
        default: null
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    altPhone: {
        type: String,
        trim: true,
        required: true
    },
    convenientTimeToCall: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
})

const ContactInfo = model('ContactInfo', contactInfoSchema)

module.exports = ContactInfo;