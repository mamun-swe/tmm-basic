const hostURL = require("../../../utils/url");
const Users = require("../../../../models/Users");
const Unlink = require("../../../services/Image");
const generateUniqueId = require("generate-unique-id");
const ImageProcess = require("../../../services/ImageProcess");

// Users list index
const Index = async (req, res, next) => {
    try {
        const {_page, _limit} = req.query;

        const totalItems = await Users.countDocuments().exec();
        // {
        //     name: 1,
        //     email: 1
        // }
        const users = await Users.find({}).sort({_id: -1}).skip(parseInt(_page) * parseInt(_limit)).limit(parseInt(_limit)).exec();
        if (users.length < 0) {
            return res.status(404).json({status: false, message: "Users not found ."});
        }

        res.status(200).json({
            status: true,
            totalItems: totalItems,
            currentItem: users.length,
            totalPage: parseInt(totalItems / _limit),
            currentPage: parseInt(_page),
            users: users
        });
    } catch (error) {
        if (error) 
            next(error);
        
    }
};

// Show specific user
const Show = async (req, res, next) => {
    try {
        const {email} = req.params;

        let result = await Users.findOne({email: email}).populate("basicAndLifestyleInformation", "user age materialStatus height bodyWeight diet bloodGroup healthInformation disability").populate("contactInformation").exec();
        if (! result) {
            return res.status(404).json({status: false, message: "User not found."});
        }

        // add Host URL with file
        if (result.profilePicture && result.profilePicture.blurImage && result.profilePicture.clearImage) {
            result.profilePicture.blurImage = hostURL(req) + "uploads/blur/" + result.profilePicture.blurImage;
            result.profilePicture.clearImage = hostURL(req) + "uploads/clear/" + result.profilePicture.clearImage;
        }

        res.status(200).json({status: true, user: result});
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

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
        }, {new: true}).exec();

        if (! updatePrimar) {
            return res.status(500).json({status: false, message: "Internal Server Error "});
        }

        res.status(201).json({status: true, message: "User Basic Informaiton Update Success !!"});
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
        const {email} = req.params;
        const file = req.files.image;

        // Check request if empty
        if (! file) 
            return res.status(422).json({status: false, message: "Image is required"});
        

        // Find user using email
        const checkedUser = await Users.findOne({email: email}).exec();

        if (! checkedUser) 
            return res.status(404).json({status: false, message: "User not found"});
        

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
            }, {new: true}).exec();

            if (updateAccount) {
                res.status(200).json({status: true, message: "Successfully profile picture uploaded"});
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
        const {email} = req.params;
        const {description} = req.body;

        // Find User
        const user = Users.findOne({email: email}).exec();
        if (! user) 
            return res.status(404).json({status: false, message: "User not found."});
        

        // Update description to database
        await Users.findOneAndUpdate({
            email: email
        }, {
            $set: {
                shortDescription: description
            }
        }, {new: true}).exec();

        res.status(201).json({status: true, message: "Successfully description added"});
    } catch (error) {
        if (error) 
            next(error);
        
    }
};

// Update personal activities
const UpdateActivities = async (req, res, next) => {
    try {
        const {field} = req.query;
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
            return res.status(422).json({status: false, message: "Please specify field."});
        }

        switch (field) {
            case "hobbies":
                if (!email && !hobbies.length && field!=hobbies) {
                    return res.status(501).json({status: false, message: "Internal Server Error"});
                }
                const hobbiesEmail = await Users.findOne({email: email}).exec();
                if (! hobbiesEmail) {
                    return res.status(404).json({status: false, message: "User Not Found"});
                }

                let updateHobbies = await Users.updateOne({
                    email: email
                }, {
                    $set: {
                        "personalActivities.hobbies": hobbies
                    }
                },{new:true}).exec();

                if (updateHobbies) {
                    return res.status(201).json({message: "Successfully hobbies saved"});
                }

                // Interest
            case "interests":
                if (!email && !interests.length) {
                    return res.status(501).json({status: false, message: "Internal Server Error"});
                }
                const interestsEmail = await Users.findOne({email: email});
                if (! interestsEmail) {
                    return res.status(404).json({status: false, message: "User Not Found"});
                }

                // let data = new set(interests)
                const updateInterest = await Users.updateOne({
                    email: email
                }, {
                    $set: {
                        "personalActivities.interests": interests
                    }
                }, {new: true}).exec();
                if (updateInterest) {
                    return res.status(200).json({status: true, message: "Interest Update Successful"});
                }
// Favorite Music
            case "favouriteMusic":
              if (!email && !favouriteMusic.length) {
                return res.status(501).json({status: false, message: "Internal Server Error"});
            }
            const favouriteMusicEmail = await Users.findOne({email: email});
            if (! favouriteMusicEmail) {
                return res.status(404).json({status: false, message: "User Not Found"});
            }

            // let data = new set(interests)
            const updatefavouriteMusic = await Users.updateOne({
                email: email
            }, {
                $set: {
                    "personalActivities.favouriteMusic": favouriteMusic
                }
            }, {new: true}).exec();
            if (updatefavouriteMusic) {
                return res.status(200).json({status: true, message: "Favourite Music Update Successful"});
            }
                // return res.status(200).json(field);

            case "favouriteReads":

              if (!email && !favouriteReads.length) {
                return res.status(501).json({status: false, message: "Internal Server Error"});
            }
            const favouriteReadsEmail = await Users.findOne({email: email});
            if (! favouriteReadsEmail) {
                return res.status(404).json({status: false, message: "User Not Found"});
            }

            // let data = new set(interests)
            const updatefavouriteReads = await Users.updateOne({
                email: email
            }, {
                $set: {
                    "personalActivities.favouriteReads": favouriteReads
                }
            }, {new: true}).exec();
            if (updatefavouriteReads) {
                return res.status(200).json({status: true, message: "Favourite Reads Update Successful"});
            }

                // return res.status(200).json(field);

            case "preferredMovies":

                if (!email && !preferredMovies.length) {
                    return res.status(501).json({status: false, message: "Internal Server Error"});
                }
                const preferredMoviesEmail = await Users.findOne({email: email});
                if (! preferredMoviesEmail) {
                    return res.status(404).json({status: false, message: "User Not Found"});
                }
    
                // let data = new set(interests)
                const updatepreferredMovies = await Users.updateOne({
                    email: email
                }, {
                    $set: {
                        "personalActivities.preferredMovies": preferredMovies
                    }
                }, {new: true}).exec();
                if (updatepreferredMovies) {
                    return res.status(200).json({status: true, message: "Preferred Movies Update Successful"});
                }
                // return res.status(200).json(field);

            case "sports":
            
                if (!email && !sports.length) {
                    return res.status(501).json({status: false, message: "Internal Server Error"});
                }
                const sportsEmail = await Users.findOne({email: email});
                if (! sportsEmail) {
                    return res.status(404).json({status: false, message: "User Not Found"});
                }
    
                // let data = new set(interests)
                const updatesports = await Users.updateOne({
                    email: email
                }, {
                    $set: {
                        "personalActivities.sports": sports
                    }
                }, {new: true}).exec();
                if (updatesports) {
                    return res.status(200).json({status: true, message: "Sports Update Successful"});
                }
                // return res.status(200).json(field);

            case "favouriteCuisine":

                if (!email && !favouriteCuisine.length) {
                    return res.status(501).json({status: false, message: "Internal Server Error"});
                }
                const favouriteCuisineEmail = await Users.findOne({email: email});
                if (! favouriteCuisineEmail) {
                    return res.status(404).json({status: false, message: "User Not Found"});
                }
    
                // let data = new set(interests)
                const updatefavouriteCuisine = await Users.updateOne({
                    email: email
                }, {
                    $set: {
                        "personalActivities.favouriteCuisine": favouriteCuisine
                    }
                }, {new: true}).exec();
                if (updatefavouriteCuisine) {
                    return res.status(200).json({status: true, message: "Favourite Cuisine Update Successful"});
                }
                // return res.status(200).json(field);
        }
    } catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

// create user
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
                },
            ]
        });
        if (checkUnique) {
            return res.status(409).json({status: false, message: "Email or Phone Number Already Exist!"});
        }
        const profileId = await generateUniqueId({length: 8, useLetters: false});

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
        res.status(201).json({status: true, message: `Successfully User created`});
    } catch (error) {
        if (error.name == "ValidationError") {
            let message = [];
            for (field in error.errors) {
                message.push(error.errors[field].message);
            }
            return res.status(500).json({success: false, message});
        }
        next(error);
    }
};

module.exports = {
    Index,
    Show,
    CreateUser,
    UpdatePrimaryInfo,
    UpdateProfilePicture,
    UpdateShortDescription,
    UpdateActivities
};

// Update field name
// db.users.update({"country": {$exists: true}}, {$rename: {"country": "livingCountry"}}, false, true)

// Drop Field
// db.users.update({}, {$unset: {livingCountry:1}}, false, true)

// Create Field
// db.collection.update({ defaulted: { $exists: false }},{ $set: { defaulted: 0 }},{ multi: true })
