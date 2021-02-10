const hostURL = require("../../../utils/url");
const Users = require("../../../../models/Users");
const PartnerPreference = require("../../../../models/PartnerPreference")

const Create = async (req, res, next) => {
    try {
        const {
            email,
            ageRange,
            heightRange,
            materialStatus,
            religion,
            socialOrder,
            motherTounge,
            spokenLanguages,
            country,
            stateDivision,
            city,
            qualifications,
            workingWith,
            professionArea,
            annualIncome,
            diet,
            bloodGroup,
            healthInformation,
            disability
        } = req.body
        // check user is registered or not
        const validUser = await Users.findOne({ email: email })
        if (!validUser) return res.status(404).json({ status: false, message: "User not found" })

        const newPreference = await new PartnerPreference({
            user: email,
            ageRange: ageRange,
            heightRange: heightRange,
            materialStatus: materialStatus,
            religion: religion,
            socialOrder: socialOrder,
            motherTounge: motherTounge,
            spokenLanguages: spokenLanguages,
            location: { country, stateDivision, city },
            educationAndProfession: { qualification: qualifications, workingWith, professionArea },
            annualIncome: annualIncome,
            diet: diet,
            bloodGroup: bloodGroup,
            healthInformation: healthInformation,
            disability: disability
        })

        // find user have any preference
        const findUser = await PartnerPreference.findOne({ user: email }).exec()

        if (!findUser) {
            // save partner preference 
            const result = await newPreference.save()

            if (!result) return res.status(501).json({ status: false, message: "Internat server error" })

            // Save Partner Preference Id in user table
            const preferenceSaveUserTable = await Users.findOneAndUpdate(
                { email: email },
                { $set: { partnerPreference: result._id } },
                { new: true })
                .exec()

            if (!preferenceSaveUserTable) return res.status(501).json({ status: false, message: "Internat server error" })

            return res.status(201).json({ status: true, message: "Partner Preference Save Successful" })
        }

        // Update All information
        await PartnerPreference.findOneAndUpdate(
            { user: email },
            {
                $set: {
                    ageRange: ageRange,
                    heightRange: heightRange,
                    materialStatus: materialStatus,
                    religion: religion,
                    socialOrder: socialOrder,
                    motherTounge: motherTounge,
                    spokenLanguages: spokenLanguages,
                    location: { country, stateDivision, city },
                    educationAndProfession: { qualification: qualifications, workingWith, professionArea },
                    annualIncome: annualIncome,
                    diet: diet,
                    bloodGroup: bloodGroup,
                    healthInformation: healthInformation,
                    disability: disability
                }
            },
            { new: true })
            .exec()

        return res.status(201).json({ status: true, message: "Partner Preference Update Successful" })

    } catch (error) {
        if (error.name == "ValidationError") {
            let message = [];
            for (field in error.errors) {
                message.push(error.errors[field].message);
            }

            return res.status(500).json({ success: false, message });
        }
        next(error)
    }
}

module.exports = {
    Create
}
