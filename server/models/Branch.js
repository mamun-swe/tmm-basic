const { Schema, model } = require("mongoose")

const branchSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    }
}, {
    timestamps: true
})

const Branch = model('Branch', branchSchema)

module.exports = Branch;