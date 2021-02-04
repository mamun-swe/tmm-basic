const { Schema, model } = require("mongoose")

const workingWithSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
})

const WorkingWith = model('WorkingWith', workingWithSchema)

module.exports = WorkingWith;