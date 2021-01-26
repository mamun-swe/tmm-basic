const { Schema, model } = require("mongoose")

const branchSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    country: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    city: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    address: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    isActive: {
        type: Boolean,
        trim: true,
        default: true,
        enum: [true, false]
    }
}, {
    timestamps: true
})

const Branch = model('Branch', branchSchema)

module.exports = Branch;