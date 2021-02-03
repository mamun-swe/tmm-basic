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
        default: "unmarried",
        enum: ["unmarried", "divorced"]
    }],
    religion: [{
        type: String,
        trim: true,
        default: null
    }],
    community: [{
        type: String,
        trim: true,
        default: null
    }],
    motherTounge: [{
        type: String,
        trim: true,
        default: null
    }],
    location: {
        Country: {
            type: String,
            trim: true,
            default: null
        },
        State: {
            type: String,
            trim: true,
            default: null
        },
        City: {
            type: String,
            trim: true,
            default: null
        }
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
            matter: {
                type: String,
                trim: true,
                default: null
            },
            range: {
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
        }
    },
    diet: [{
        type: String,
        trim: true,
        default: null
    }]
},
    {
        timestamps: true,
    }
);

const PartnerPreference = model("PartnerPreference", PartnerPreferenceSchema);
module.exports = PartnerPreference;
