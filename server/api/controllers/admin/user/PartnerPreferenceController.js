const hostURL = require("../../../utils/url");
const Users = require("../../../../models/Users");
const PartnerPreference = require("../../../../models/PartnerPreference")

const Create = async (req,res,next) => {
    try{

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
        }= req.body

        const findUser = PartnerPreference.findOne({email:email})
        if(!findUser){
            const savePreference = new PartnerPreference({
                'user':email,
                'ageRange':ageRange,
                'heightRange':heightRange,
                'materialStatus':materialStatus,
                'religion':religion,
                'socialOrder':socialOrder,
                'motherTounge':motherTounge,
                'location':location,
                'educationAndProfession':educationAndProfession,
                'diet':diet,
                'bloodGroup':bloodGroup,
                'healthInformation':healthInformation,
                'disabilit':disability
                })

                let result = savePreference.save()
                if(!result){
                    return res.status(501).json({
                        status:false,
                        message:"Internat server error"
                    })
                }
                return res.status(200).json({
                    status:true,
                    message:"Partner Preference Save Successful"
                })   
        }
        
        const updatePreference = PartnerPreference.findOneAndUpdate({user:email},{
            'ageRange':ageRange,
            'heightRange':heightRange,
            'materialStatus':materialStatus,
            'religion':religion,
            'socialOrder':socialOrder,
            'motherTounge':motherTounge,
            'location':location,
            'educationAndProfession':educationAndProfession,
            'diet':diet,
            'bloodGroup':bloodGroup,
            'healthInformation':healthInformation,
            'disabilit':disability
        },{new:true})

        if(!updatePreference){
            return res.status(501).json({
                status:false,
                message:"Internat server error"
            })
        }
        return res.status(200).json({
            status:true,
            message:"Partner Preference Update Successful"
        }) 
        
    }catch(error){
        if(error){
            return console.log(error)
        }
        next(error)
    }
}

module.exports = {
    Create
}