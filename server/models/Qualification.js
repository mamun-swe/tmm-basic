const { Schema, model } = require("mongoose")

const qualificationSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
})

const Qualification = model('Qualification', qualificationSchema)

module.exports = Qualification;