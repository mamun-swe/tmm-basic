const hostURL = require("../../../utils/url");
const Users = require("../../../../models/Users");
const Religions = require("../../../../models/Religion")
const Countries = require("../../../../models/Country")
const Languages = require("../../../../models/Language")
const Unlink = require("../../../services/Image");
const generateUniqueId = require("generate-unique-id");
const ImageProcess = require("../../../services/ImageProcess");

// Users list index
const Index = async (req, res, next) => {
    try {
        const { _page, _limit } = req.query;

        const totalItems = await Users.countDocuments().exec();
        let results = await Users.find({}, { name: 1, email: 1, profilePicture: 1 })
            .sort({ _id: -1 })
            .skip(parseInt(_page) * parseInt(_limit))
            .limit(parseInt(_limit))
            .exec();


        if (results.length < 0) {
            return res.status(404).json({ status: false, message: "Users not found ." });
        }

        // Modifiy image path
        await results.map(user => {
            if (user.profilePicture.blurImage && user.profilePicture.clearImage) {
                user.profilePicture.blurImage = hostURL(req) + "uploads/blur/" + user.profilePicture.blurImage
                user.profilePicture.clearImage = hostURL(req) + "uploads/clear/" + user.profilePicture.clearImage
            } else {
                user.profilePicture.blurImage = null
                user.profilePicture.clearImage = null
            }
        })

        res.status(200).json({
            status: true,
            totalItems: totalItems,
            currentItem: results.length,
            totalPage: parseInt(totalItems / _limit),
            currentPage: parseInt(_page),
            users: results
        });
    } catch (error) {
        if (error) next(error)
    }
};

// Create a user
const CreateUser = async (req, res, next) => {
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
            livingCountry
        } = req.body;

        const checkUnique = await Users.findOne({
            $or: [
                {
                    email: email
                }, {
                    phone: phone
                }
            ]
        });
        if (checkUnique) {
            return res.status(409).json({ status: false, message: "Email or Phone Number Already Exist!" });
        }
        const profileId = await generateUniqueId({ length: 8, useLetters: false });

        const result = new Users({
            profileId: profileId,
            name: name,
            phone: phone,
            gender: gender,
            email: email,
            lookingFor: lookingFor,
            dob: dob,
            religion: religion,
            socialOrder: socialOrder,
            birthCountry: birthCountry,
            livingCountry: livingCountry
        });
        await result.save();
        res.status(201).json({ status: true, message: `Successfully User created` });
    } catch (error) {
        if (error.name == "ValidationError") {
            let message = [];
            for (field in error.errors) {
                message.push(error.errors[field].message);
            }

            return res.status(500).json({ success: false, message });
        }
        next(error);
    }
};

// Show specific user
const Show = async (req, res, next) => {
    try {
        const { email } = req.params;

        let result = await Users.findOne({ email: email }).populate("basicAndLifestyleInformation", "user age materialStatus height bodyWeight diet bloodGroup healthInformation disability").populate("contactInformation").exec();
        if (!result) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        // add Host URL with file
        if (result.profilePicture && result.profilePicture.blurImage && result.profilePicture.clearImage) {
            result.profilePicture.blurImage = hostURL(req) + "uploads/blur/" + result.profilePicture.blurImage;
            result.profilePicture.clearImage = hostURL(req) + "uploads/clear/" + result.profilePicture.clearImage;
        }

        res.status(200).json({ status: true, user: result });
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

// Search User
const SearchUser = async (req, res, next) => {
    try { // Query Params
        const { query } = req.query

        // Search from users collection
        let results = await Users.find({
            email: new RegExp(query, 'i')
        }).exec()

        // Modifiy image path
        await results.map(user => {
            if (user.profilePicture.blurImage && user.profilePicture.clearImage) {
                user.profilePicture.blurImage = hostURL(req) + "uploads/blur/" + user.profilePicture.blurImage
                user.profilePicture.clearImage = hostURL(req) + "uploads/clear/" + user.profilePicture.clearImage
            } else {
                user.profilePicture.blurImage = null
                user.profilePicture.clearImage = null
            }
        })

        res.status(200).json(results)

    } catch (error) {
        if (error) next(error)
    }
}

// Update primary information of a user
const UpdatePrimaryInfo = async (req, res, next) => {
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
            livingCountry
        } = req.body;

        const updatePrimar = await Users.findOneAndUpdate({
            email: email
        }, {
            $set: {
                name: name,
                phone: phone,
                email: email,
                gender: gender,
                lookingFor: lookingFor,
                dob: dob,
                religion: religion,
                socialOrder: socialOrder,
                birthCountry: birthCountry,
                livingCountry: livingCountry
            }
        }, { new: true }).exec();

        if (!updatePrimar) {
            return res.status(500).json({ status: false, message: "Internal Server Error " });
        }

        res.status(201).json({ status: true, message: "User Basic Informaiton Update Success !!" });
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

// Update Profile Picture
const UpdateProfilePicture = async (req, res, next) => {
    try {
        const { email } = req.params;
        const file = req.files.image;

        // Check request if empty
        if (!file)
            return res.status(422).json({ status: false, message: "Image is required" });



        // Find user using email
        const checkedUser = await Users.findOne({ email: email }).exec();

        if (!checkedUser)
            return res.status(404).json({ status: false, message: "User not found" });



        // Remove Blur image
        if (checkedUser && checkedUser.profilePicture.blurImage && checkedUser.profilePicture.clearImage) {
            await Unlink.removeFile("./uploads/blur/", checkedUser.profilePicture.blurImage);
            await Unlink.removeFile("./uploads/clear/", checkedUser.profilePicture.clearImage);
        }

        // Process image
        const isBlurUpload = await ImageProcess.BlurImage(file);
        const isCLearUpload = await ImageProcess.ClearImage(file);

        if (isBlurUpload && isCLearUpload) { // Update image to database
            const updateAccount = await Users.findOneAndUpdate({
                email: email
            }, {
                $set: {
                    profilePicture: {
                        blurImage: isBlurUpload,
                        clearImage: isCLearUpload
                    }
                }
            }, { new: true }).exec();

            if (updateAccount) {
                res.status(200).json({ status: true, message: "Successfully profile picture uploaded" });
            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

// Update Short Description
const UpdateShortDescription = async (req, res, next) => {
    try {
        const { email } = req.params;
        const { description } = req.body;

        // Find User
        const user = Users.findOne({ email: email }).exec();
        if (!user)
            return res.status(404).json({ status: false, message: "User not found." });



        // Update description to database
        await Users.findOneAndUpdate({
            email: email
        }, {
            $set: {
                shortDescription: description
            }
        }, { new: true }).exec();

        res.status(201).json({ status: true, message: "Successfully description added" });
    } catch (error) {
        if (error)
            next(error);



    }
};

// Update personal activities
const UpdateActivities = async (req, res, next) => {
    try {
        const { field } = req.query;
        const {
            email,
            hobbies,
            interests,
            favouriteMusic,
            favouriteReads,
            preferredMovies,
            sports,
            favouriteCuisine
        } = req.body;

        if (!field) {
            return res.status(422).json({ status: false, message: "Please specify field." });
        }

        switch (field) { // Hobbi
            case "hobbies":
                // Check email & hobbies
                if (!email && !hobbies.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const user = await Users.findOne({ email: email }).exec();
                if (!user) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save Hobbies
                const saveHobbi = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            hobbies: hobbies
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (saveHobbi) {
                    return res.status(201).json({ message: "Successfully hobbies saved" });
                }

            // return res.status(200).json(hobbies)

            // Interest
            case "interests":
                // Check email & Interests
                if (!email && !interests.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const interestsUser = await Users.findOne({ email: email }).exec();
                if (!interestsUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save interests
                const saveinterests = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            interests: interests
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (saveinterests) {
                    return res.status(201).json({ message: "Successfully Interests saved" });
                }

            // return res.status(200).json(interests)
            // return res.status(200).json(field);

            case "favouriteMusic":
                // Check email & Favorite Music
                if (!email && !favouriteMusic.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const favouriteMusicUser = await Users.findOne({ email: email }).exec();
                if (!favouriteMusicUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save Favourite Music
                const saveFavouriteMusic = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            favouriteMusic: favouriteMusic
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (saveFavouriteMusic) {
                    return res.status(201).json({ message: "Successfully Favourite Music saved" });
                }
            // return res.status(200).json(field);

            case "favouriteReads":
                // Check email & Favourite Reads
                if (!email && !favouriteReads.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const favouriteReadsUser = await Users.findOne({ email: email }).exec();
                if (!favouriteReadsUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save Favourite Reads
                const saveFavouriteReads = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            favouriteReads: favouriteReads
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (saveFavouriteReads) {
                    return res.status(201).json({ message: "Successfully Favourite Reads saved" });
                }

            // return res.status(200).json(field);

            case "preferredMovies":
                // Check email & Preferred Movies
                if (!email && !preferredMovies.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const preferredMoviesUser = await Users.findOne({ email: email }).exec();

                if (!preferredMoviesUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save Preferred Movies
                const savepreferredMovies = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            preferredMovies: preferredMovies
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (savepreferredMovies) {
                    return res.status(201).json({ message: "Successfully Preferred Movies saved" });
                }

            // return res.status(200).json(field);

            case "sports":
                // Check email & Interests
                if (!email && !sports.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const sportsUser = await Users.findOne({ email: email }).exec();

                if (!sportsUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save Sports
                const savesports = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            sports: sports
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (savesports) {
                    return res.status(201).json({ message: "Successfully Sports saved" });
                }
            // return res.status(200).json(field);

            case "favouriteCuisine":
                // Check email & Interests
                if (!email && !favouriteCuisine.length)
                    return res.status(501).json({ status: false, message: "Internat server error" });



                // Find a user
                const favouriteCuisineUser = await Users.findOne({ email: email }).exec();
                if (!favouriteCuisineUser) {
                    return res.status(404).json({ status: false, message: "Invalid email address" });
                }

                // Save favourite Cuisine
                const savesFavouriteCuisine = Users.findOneAndUpdate({
                    email: email
                }, {
                    $set: {
                        personalActivities: {
                            favouriteCuisine: favouriteCuisine
                        }
                    }
                }, { new: true }).exec();

                // Send success message
                if (savesFavouriteCuisine) {
                    return res.status(201).json({ message: "Successfully Favourite Cuisine saved" });
                }

            // return res.status(200).json(field);

            default:
                return res.status(422).json({ status: false, message: "Invalid field." });
        }
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

// All needed data of partner preference
const PartnerPreferenceData = async (req, res, next) => {
    try {
        const religions = await Religions.find({}, { name: 1, socialOrders: 1 }).exec()
        const countries = await Countries.find({}, { name: 1 }).exec()
        const languages = await Languages.find({}, { name: 1 }).exec()

        const religionResults = await religions.map(religion => religion.name)
        const countryResults = await countries.map(country => country.name)
        const languageResults = await languages.map(language => language.name)
        const orders = await religions.map(order => order.socialOrders).flat()

        res.status(200).json({
            status: true,
            religions: religionResults,
            socialOrders: orders,
            countries: countryResults,
            languages: languageResults
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    CreateUser,
    Show,
    SearchUser,
    UpdatePrimaryInfo,
    UpdateProfilePicture,
    UpdateShortDescription,
    UpdateActivities,
    PartnerPreferenceData
};

// Update field name
// db.users.update({"country": {$exists: true}}, {$rename: {"country": "livingCountry"}}, false, true)

// Drop Field
// db.users.update({}, {$unset: {livingCountry:1}}, false, true)

// Create Field
// db.collection.update({ defaulted: { $exists: false }},{ $set: { defaulted: 0 }},{ multi: true })
