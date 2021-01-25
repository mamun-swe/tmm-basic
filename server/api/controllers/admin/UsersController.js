const Users = require('../../../models/Users')

// Users list index
const Index = async (req, res, next) => {
    try {
        const { _page, _limit } = req.query

        const totalItems = await Users.countDocuments().exec()
        const users = await Users.find({}, { name: 1, email: 1 }).skip(parseInt(_page) * parseInt(_limit)).limit(parseInt(_limit)).exec()
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

        const result = await Users.findOne({ 'email': email }).exec()
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


module.exports = {
    Index,
    Show
}



// Update field name
// db.users.update({"country": {$exists: true}}, {$rename: {"country": "livingCountry"}}, false, true)

// Drop Field
// db.users.update({}, {$unset: {livingCountry:1}}, false, true)

// Create Field
// db.collection.update({ defaulted: { $exists: false }},{ $set: { defaulted: 0 }},{ multi: true })
