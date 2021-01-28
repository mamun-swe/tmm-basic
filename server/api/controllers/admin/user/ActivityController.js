const Activity = require('../../../../models/PersonalActivities')

// Get all activities
const Index = async (req, res, next) => {
    try {
        const results = await Activity.find().exec()
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Activity not found'
            })
        }

        res.status(200).json({
            status: true,
            activities: results[0]
        })

    } catch (error) {
        if (error) next(error)
    }
}

// Store Hobbi
const StoreHobbi = async (req, res, next) => {
    try {
        const { hobbiTitle } = req.body

        // Check activity avilable or not
        const exitActivity = await Activity.find().limit(1).exec()
        if (!exitActivity.length) {
            const newActivity = new Activity({
                hobbies: hobbiTitle
            })

            await newActivity.save()
            return res.status(201).json({
                status: true,
                message: `${hobbiTitle} created.`
            })
        }

        // Activity already saved
        const checkHobbi = exitActivity[0].hobbies.find(title => title.toLowerCase() === hobbiTitle.toLowerCase())
        if (checkHobbi) {
            return res.status(409).json({
                status: false,
                message: `${hobbiTitle} already created`
            })
        }

        // Update hobbi
        const updateHobbi = await exitActivity[0].update({ $push: { hobbies: hobbiTitle } }, { new: true }).exec()
        if (updateHobbi) {
            return res.status(201).json({
                status: true,
                message: `${hobbiTitle} created.`
            })
        }

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


// Store Interest
const StoreInterest = async (req, res, next) => {
    try {
        const { interestTitle } = req.body

        // Check activity avilable or not
        const exitActivity = await Activity.find().limit(1).exec()
        if (!exitActivity.length) {
            const newActivity = new Activity({
                interests: interestTitle
            })

            await newActivity.save()
            return res.status(201).json({
                status: true,
                message: `${interestTitle} created.`
            })
        }

        // Activity already saved
        const checkInterest = exitActivity[0].interests.find(title => title.toLowerCase() === interestTitle.toLowerCase())
        if (checkInterest) {
            return res.status(409).json({
                status: false,
                message: `${interestTitle} already created`
            })
        }

        // Update interest
        const updateInterest = await exitActivity[0].update({ $push: { interests: interestTitle } }, { new: true }).exec()
        if (updateInterest) {
            return res.status(201).json({
                status: true,
                message: `${interestTitle} created.`
            })
        }
    } catch (error) {
        if (error) next(error)
    }
}

// Store Music
const StoreMusic = async (req, res, next) => {
    try {
        const { musicType } = req.body

        // Check activity avilable or not
        const exitActivity = await Activity.find().limit(1).exec()

        if (!exitActivity.length) {
            const newActivity = new Activity({
                musics: musicType
            })

            await newActivity.save()
            return res.status(201).json({
                status: true,
                message: `${musicType} created.`
            })
        }

        // Activity already saved
        const checkMusic = exitActivity[0].musics.find(title => title.toLowerCase() === musicType.toLowerCase())
        if (checkMusic) {
            return res.status(409).json({
                status: false,
                message: `${musicType} already created`
            })
        }

        // Update hobbi
        const updateMusic = await exitActivity[0].update({ $push: { musics: musicType } }, { new: true }).exec()
        if (updateMusic) {
            return res.status(201).json({
                status: true,
                message: `${musicType} created.`
            })
        }
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index,
    StoreHobbi,
    StoreInterest,
    StoreMusic
}