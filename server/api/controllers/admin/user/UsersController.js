const Users = require('../../../../models/Users')
const Unlink = require('../../../services/Image')
const ImageProcess = require('../../../services/ImageProcess')


// Users list index
const Index = async(req, res, next) => {
    try {
        const { _page, _limit } = req.query

        const totalItems = await Users.countDocuments().exec()
        const users = await Users.find({}, { name: 1, email: 1 })
            .sort({ _id: -1 })
            .skip(parseInt(_page) * parseInt(_limit))
            .limit(parseInt(_limit))
            .exec()
        if (users.length < 0) {
            return res.status(404).json({
                status: false,
                message: 'Users not found .'
            })
        }

        res.status(200).json({
            status: true,
            totalItems: totalItems,
            currentItem: users.length,
            totalPage: parseInt(totalItems / _limit),
            currentPage: parseInt(_page),
            users: users
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Show specific user
const Show = async(req, res, next) => {
    try {
        const { email } = req.params

        const result = await Users.findOne({ 'email': email })
            .populate(
                'basicAndLifestyleInformation',
                'user age materialStatus height bodyWeight diet bloodGroup healthInformation disability'
            )
            .populate('contactInformation')
            .exec()
        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'User not found.'
            })
        }

        res.status(200).json({
            status: true,
            user: result
        })

    } catch (error) {
        if (error) next(error)
    }
}


const UpdatePrimaryInfo = async(req, res, next) => {
    try {
        const {
            name,
            phone,
            email,
            gender,
            lookingFor,
            dob,
            religion,
            socialOrder,
            birthCountry,
            livingCountry,
        } = req.body

        const updatePrimar = await Users.findOneAndUpdate({ 'email': email }, {
            $set: {
                'name': name,
                'phone': phone,
                'email': email,
                'gender': gender,
                'lookingFor': lookingFor,
                'dob': dob,
                'religion': religion,
                'socialOrder': socialOrder,
                'birthCountry': birthCountry,
                'livingCountry': livingCountry,
            }
        }, { new: true }).exec()

        if (!updatePrimar) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error '
            })
        }

        res.status(201).json({
            status: true,
            message: "User Basic Informaiton Update Success !!"
        })

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


// Update Profile Picture
const UpdateProfilePicture = async(req, res, next) => {
    try {

        const { email } = req.params
        const file = req.files.image

        // Check request if empty
        if (!file) return res.status(422).json({ status: false, message: 'Image is required' })

        // Find user using email
        const checkedUser = await Users.findOne({ 'email': email }).exec()

        if (!checkedUser)
            return res.status(404).json({ status: false, message: 'User not found' })

        // Remove Blur image
        if (checkedUser && checkedUser.profilePicture.blurImage && checkedUser.profilePicture.clearImage) {
            await Unlink.removeFile('./uploads/blur/', checkedUser.profilePicture.blurImage)
            await Unlink.removeFile('./uploads/clear/', checkedUser.profilePicture.clearImage)
        }

        // Process image 
        const isBlurUpload = await ImageProcess.BlurImage(file)
        const isCLearUpload = await ImageProcess.ClearImage(file)

        if (isBlurUpload && isCLearUpload) {
            // Update image to database
            const updateAccount = await Users.findOneAndUpdate({ 'email': email }, {
                $set: {
                    profilePicture: {
                        blurImage: isBlurUpload,
                        clearImage: isCLearUpload
                    }
                }
            }, { new: true }).exec()

            if (updateAccount) {
                res.status(200).json({
                    status: true,
                    message: 'Successfully profile picture uploaded'
                })
            }
        }

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


// Update personal activities
const UpdateActivities = async(req, res, next) => {
    try {
        const { field } = req.query
        const { email, hobbies, interests, favouriteMusic, favouriteReads, preferredMovies, sports, favouriteCuisine } = req.body
        if (!field) {
            return res.status(422).json({
                status: false,
                message: 'Please specify field.'
            })
        }


        switch (field) {

            // Hobbi
            case 'hobbies':

                // Check email & hobbies
                if (!email && !hobbies.length)
                    return res.status(501).json({ status: false, message: 'Internat server error' })

                // Find a user
                const user = await Users.findOne({ 'email': email }).exec()
                if (!user) {
                    return res.status(404).json({ status: false, message: 'Invalid email address' })
                }

                // Save Hobbies
                const saveHobbi = Users.findOneAndUpdate({ 'email': email }, { $set: { personalActivities: { hobbies: hobbies } } }, { new: true })
                    .exec()

                // Send success message
                if (saveHobbi) {
                    return res.status(201).json({ message: 'Successfully hobbies saved' })
                }

                // return res.status(200).json(hobbies)

                // Interest
            case 'interests':
                return res.status(200).json(field)

            case 'favouriteMusic':
                return res.status(200).json(field)

            case 'favouriteReads':
                return res.status(200).json(field)

            case 'preferredMovies':
                return res.status(200).json(field)

            case 'sports':
                return res.status(200).json(field)

            case 'favouriteCuisine':
                return res.status(200).json(field)


            default:
                return res.status(422).json({
                    status: false,
                    message: 'Invalid field.'
                })
        }


    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

// create user
const CreateUser = async(req, res, next) => {
    try {
        const {
            name,
            phone,
            email,
            gender,
            lookingFor,
            dob,
            religion,
            socialOrder,
            birthCountry,
            livingCountry,
        } = req.body

        const checkUnique = await Users.findOne({ $or: [{ email: email }, { phone: phone }] })
        if (checkUnique) {
            return res.status(409).json({
                status: false,
                message: "Email or Phone Number Already Exist!"
            })
        }
        const profileId = await generateUniqueId({
            length: 8,
            useLetters: false
        });

        const result = new Users({
            'profileId': profileId,
            'name': name,
            'phone': phone,
            'gender': gender,
            'email': email,
            'lookingFor': lookingFor,
            'dob': dob,
            'religion': religion,
            'socialOrder': socialOrder,
            'birthCountry': birthCountry,
            'livingCountry': livingCountry
        })
        await result.save()
        res.status(201).json({
            status: true,
            message: `Successfully User created`
        })
    } catch (error) {
        if (error.name == 'ValidationError') {
            let message = []
            for (field in error.errors) {
                message.push(error.errors[field].message)
            }
            return res.status(500).json({
                success: false,
                message
            })
        }
        next(error)

    }
}

module.exports = {
    Index,
    CreateUser,
    Show,
    UpdatePrimaryInfo,
    UpdateProfilePicture,
    UpdateActivities,
}


// Update field name
// db.users.update({"country": {$exists: true}}, {$rename: {"country": "livingCountry"}}, false, true)

// Drop Field
// db.users.update({}, {$unset: {livingCountry:1}}, false, true)

// Create Field
// db.collection.update({ defaulted: { $exists: false }},{ $set: { defaulted: 0 }},{ multi: true })