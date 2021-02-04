const { Schema, model } = require("mongoose")

const professionAreaSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
})

const ProfessionArea = model('ProfessionArea', professionAreaSchema)

module.exports = ProfessionArea;