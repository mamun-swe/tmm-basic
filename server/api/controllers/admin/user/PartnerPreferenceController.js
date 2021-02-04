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
            location,
            educationAndProfession,
            diet,
            bloodGroup,
            healthInformation,
            disability
        } = req.body

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
            location: location,
            educationAndProfession: educationAndProfession,
            diet: diet,
            bloodGroup: bloodGroup,
            healthInformation: healthInformation,
            disabilit: disability
        })

        const findUser = await PartnerPreference.findOne({ email: email }).exec()
        if (!findUser) {
            let result = await newPreference.save()
            if (!result) return res.status(501).json({ status: false, message: "Internat server error" })
            return res.status(201).json({ status: true, message: "Partner Preference Save Successful" })
        }

        await PartnerPreference.findOneAndUpdate({ user: email },
            {
                $set: { newPreference }
            }, { new: true }).exec()
            
        return res.status(200).json({ status: true, message: "Partner Preference Update Successful" })

    } catch (error) {
        if (error) {
            console.log(error)
        }
        next(error)
    }
}

module.exports = {
    Create
}
