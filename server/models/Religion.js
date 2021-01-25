const { Schema, model } = require("mongoose")

const religionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxlength: 50,
    },
    socialOrders: [{
        type: String,
        trim: true,
        default: null
    }]
}, {
    timestamps: true
})

const Religion = model('Religion', religionSchema)

module.exports = Religion;