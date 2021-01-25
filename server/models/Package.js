const { Schema, model } = require("mongoose")

const packageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    }
}, {
    timestamps: true
})

const Package = model('Package', packageSchema)

module.exports = Package;