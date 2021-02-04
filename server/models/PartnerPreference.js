const { Schema, model } = require("mongoose");

const PartnerPreferenceSchema = new Schema({
    user: {
        type: String,
        ref: 'User'
    },
    ageRange: {
        startFrom: {
            type: String,
            trim: true,
            default: null
        },
        endTo: {
            type: String,
            trim: true,
            default: null
        }
    },
    heightRange: {
        startFrom: {
            type: String,
            trim: true,
            default: null
        },
        endTo: {
            type: String,
            trim: true,
            default: null
        }
    },
    materialStatus: [{
        type: String,
        trim: true,
        default: "never_married",
        enum: ["never_married", "divorced", "annulled", "widowed"]
    }],
    religion: [{
        type: String,
        trim: true,
        default: null
    }],
    socialOrder: [{
        type: String,
        trim: true,
        default: null
    }],
    motherTounge: {
        type: String,
        trim: true,
        default: null
    },
    location: {
        country: [{
            type: String,
            trim: true,
            default: null
        }],
        stateDevision: [{
            type: String,
            trim: true,
            default: null
        }],
        city: [{
            type: String,
            trim: true,
            default: null
        }]
    },
    educationAndProfession: {
        qualification: [{
            type: String,
            trim: true,
            default: null
        }],
        workingWith: [{
            type: String,
            trim: true,
            default: null
        }],
        professionArea: [{
            type: String,
            trim: true,
            default: null
        }],
        annualIncome: {
            startFrom: {
                type: String,
                trim: true,
                default: null
            },
            endTo: {
                type: String,
                trim: true,
                default: null
            }
        }
    },
    diet: [{
        type: String,
        trim: true,
        default: null
    }],
    bloodGroup: [{
        type: String,
        trim: true,
        default: null,
        enum: [null, "A(+ev)", "A(-ev)", "B(+ev)", "B(-ev)", "AB(+ev)", "AB(-ev)", "O(+ev)", "O(-ev)"]
    }],
    healthInformation: [{
        type: String,
        trim: true,
        default: null,
        enum: [null, 'No Health Problem', 'HIV positive', 'Diabetes', 'Low BP', 'Hight BP', 'Heart Aliments', 'Other']
    }],
    disability: [{
        type: String,
        trim: true,
        default: null,
        enum: [null, 'none', 'physical_disability']
    }]
},
    {
        timestamps: true,
    }
);

const PartnerPreference = model("PartnerPreference", PartnerPreferenceSchema);
module.exports = PartnerPreference;
