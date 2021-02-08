const User = require("../../../../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// create new user
const RegisterUser = async (req, res, next) => {
    try {
        const { name, email, role } = req.body
        const checkUser = await User.findOne({ email: email })
        // check register
        if (checkUser) return res.status(401).json({ status: 401, message: "User already exist! " })

        const createUser = new User({
            name: name,
            email: email,
            role: role
        })
        // save user
        await createUser.save()
        return res.status(201).json({
            status: true,
            message: "User Create Successful"
        })


    } catch (error) {
        if (error) next(error)
    }
}

const LoginUser = async (req, res, next) => {
    try {

    } catch (error) {
        if (error) next(error)
    }
}

module.exports = { RegisterUser, LoginUser }