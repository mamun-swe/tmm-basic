const { Schema, model } = require("mongoose")

const basicAndLifestyleSchema = new Schema({
    user: {
        type: String,
        ref: 'User'
    },
    age: {
        type: Number,
        trim: true,
        required: true
    },
    materialStatus: {
        type: String,
        trim: true,
        required: true,
        enum: ['never married', 'divorced', 'annulled', 'widowed']
    },
    height: {
        type: String,
        trim: true,
        required: true,
    },
    bodyWeight: {
        type: Number,
        trim: true,
        required: true,
    },
    diet: [{
        type: String,
        trim: true,
        required: true,
        enum: ['open to all', 'veg', 'non-veg', 'vegan']
    }],
    bloodGroup: {
        type: String,
        trim: true,
        required: true,
        enum: ["A(+ev)", "A(-ev)", "B(+ev)", "B(-ev)", "AB(+ev)", "AB(-ev)", "O(+ev)", "O(-ev)"]
    },
    healthInformation: {
        type: String,
        trim: true,
        required: true,
        enum: ['No Health Problem', 'HIV positive', 'Diabetes', 'Low BP', 'Hight BP', 'Heart Aliments', 'Other']
    },
    disability: {
        type: String,
        trim: true,
        default: 'none',
        enum: ['none', 'physical disability']
    }
}, {
    timestamps: true
})

const BasicAndLifestyle = model('BasicAndLifestyle', basicAndLifestyleSchema)

module.exports = BasicAndLifestyle;