const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    }
}, {
    timestamps: true
})

const Post = model('Post', postSchema)

module.exports = Post;