const hostURL = require("../../../utils/url");
const Users = require("../../../../models/Users");
const PartnerPreference = require("../../../../models/PartnerPreference")

const Create = async (req,res,next) => {
    try{

       const {
           user

        }= req.body


        // return res.status(200).json({
        //     status:true,
        //     message:"Partnerpreference created"
        // })
    }
    catch(error){
        if(error){
            return console.log(error)
        }
        next(error)
    }
}

module.exports = {
    Create
}