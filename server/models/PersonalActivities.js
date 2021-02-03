const {Schema, model} = require("mongoose")

const personalActivitieSchema = new Schema({
    hobbies: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    interests: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    musics: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    reads: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    movies: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    sports: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    cuisines: [
        {
            type: String,
            trim: true,
            default: null
        }
    ]
}, {timestamps: true})

const PersonalActivities = model('PersonalActivities', personalActivitieSchema)

module.exports = PersonalActivities;
