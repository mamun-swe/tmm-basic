const Users = require('../../../../models/Users')

// Users list index
const Index = async (req, res, next) => {
    try {
        const { _page, _limit } = req.query

        const totalItems = await Users.countDocuments().exec()
        const users = await Users.find({}, { name: 1, email: 1 })
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
const Show = async (req, res, next) => {
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

// Update personal activities
const UpdateActivities = async (req, res, next) => {
    try {
        const { field } = req.query
        const { email, hobbies, interests, favouriteMusic, favouriteReads, preferredMovies, sports, favouriteCuisine } = req.body
        if (!field) {
            return res.status(422).json({
                status: false,
                message: 'Please specify field.'
            })
        }


/////////////////////////// Working here ///////////////////
        switch (field) {
            case 'hobbies':
                if (!email && !hobbies.length) {
                    return res.status(501).json({ status: false, message: 'Internat server error hh' })
                }

                // Find user
                const user = await Users.findOne({ 'email': email }).exec()
                if (!user) return res.status(404).json({ status: false, message: 'Invalid email address' })

                // Find exists hobbies
                const existHobbies = Users.find({ 'hobbies': { $elemMatch: { $elemMatch: { $in: hobbies } } } }).exec()
                if (existHobbies.length) return res.status(200).json({ status: false, messgae: 'This fields already added' })

                return res.status(200).json({ messgae: 'not found' })


            // return res.status(200).json(hobbies)

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


module.exports = {
    Index,
    Show,
    UpdateActivities
}



// Update field name
// db.users.update({"country": {$exists: true}}, {$rename: {"country": "livingCountry"}}, false, true)

// Drop Field
// db.users.update({}, {$unset: {livingCountry:1}}, false, true)

// Create Field
// db.collection.update({ defaulted: { $exists: false }},{ $set: { defaulted: 0 }},{ multi: true })
