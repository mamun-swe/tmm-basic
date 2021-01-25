const { Schema, model } = require("mongoose")

const userImageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    }
}, {
    timestamps: true
})

const UserImage = model('UserImage', userImageSchema)

module.exports = UserImage;