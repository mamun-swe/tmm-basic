const { Schema, model } = require("mongoose")

const languageSchema = new Schema({
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

const Language = model('Language', languageSchema)

module.exports = Language;