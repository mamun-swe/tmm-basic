const { Schema, model } = require("mongoose")

const countrySchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxlength: 50,
    }
}, {
    timestamps: true
})

const Country = model('Country', countrySchema)

module.exports = Country;