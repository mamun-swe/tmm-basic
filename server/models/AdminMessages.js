const { Schema, model } = require("mongoose")

const adminMessagesSchema = new Schema({
    message: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const AdminMessage = model('AdminMessage', adminMessagesSchema)

module.exports = AdminMessage;