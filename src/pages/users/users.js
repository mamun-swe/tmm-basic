db.createCollection('User', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['baranchId', 'createdAt ', 'updatedAt'],
            properties: {
                name: { bsonType: 'string' },
                phone: { bsonType: 'string' },
                profileId: { bsonType: 'string' },
                email: { bsonType: 'string' },
                password: { bsonType: 'string' },
                gender: { bsonType: 'string' },
                lookingFor: { bsonType: 'string' },
                dob: { bsonType: 'date' },
                religion: { bsonType: 'string' },
                socialOrder: { bsonType: 'string' },
                birthCountry: { bsonType: 'string' },
                livingCountry: { bsonType: 'string' },
                baranchId: { bsonType: 'objectId' },


                profileCreatedFor: { bsonType: 'string' },
                profileCreatorId: { bsonType: 'int' },
                createdProfilesId: { bsonType: 'int' },
                // profilePicture: { bsonType: 'string' },
                shortDescription: { bsonType: 'string' },
                basicAndLifestyleInformation: {
                    bsonType: 'object',
                    required: [],
                    properties: { age: { bsonType: 'int' }, materialStatus: { bsonType: 'string' }, height: { bsonType: 'string' }, bodyWeight: { bsonType: 'string' }, diet: { bsonType: 'string' }, bloodGroup: { bsonType: 'string' }, healthInformation: { bsonType: 'string' }, disability: { bsonType: 'string' } }
                },
                religiousBackground: {
                    bsonType: 'object',
                    required: [],
                    properties: { religion: { bsonType: 'string' }, community: { bsonType: 'string' }, subCommunity: { bsonType: 'string' } }
                },
                language: {
                    bsonType: 'object',
                    required: [],
                    properties: { motherTongue: { bsonType: 'string' }, spokenLanguage: { bsonType: 'array', items: {} } }
                },
                partnerPreference: {
                    bsonType: 'object',
                    required: [],
                    properties: {
                        ageRange: {
                            bsonType: 'object',
                            required: [],
                            properties: { startFrom: { bsonType: 'int' }, endTo: { bsonType: 'int' } }
                        },
                        heightRange: {
                            bsonType: 'object',
                            required: [],
                            properties: { startFrom: { bsonType: 'string' }, endTo: { bsonType: 'string' } }
                        },
                        materialStatus: { bsonType: 'array' },
                        religion: { bsonType: 'string' },
                        community: { bsonType: 'string' },
                        motherTounge: { bsonType: 'string' },
                        location: {
                            bsonType: 'object',
                            required: [],
                            properties: { Country: { bsonType: 'string' }, State: { bsonType: 'string' }, City: { bsonType: 'string' } }
                        },
                        educationAndProfession: {
                            bsonType: 'object',
                            required: [],
                            properties: {
                                qualification: { bsonType: 'array', items: {} },
                                workingWith: { bsonType: 'array', items: {} },
                                professionArea: { bsonType: 'array', items: {} },
                                annualIncome: {
                                    bsonType: 'object',
                                    required: [],
                                    properties: { matter: { bsonType: 'bool' }, range: { bsonType: 'array', items: {} } }
                                },
                                diet: { bsonType: 'array', items: {} }
                            }
                        },
                        diet: { bsonType: 'string' }
                    }
                },
                contactInformation: {
                    bsonType: 'object',
                    required: [],
                    properties: { phoneNumber: { bsonType: 'string' }, contactPersonName: { bsonType: 'string' }, relationshipWithContactPerson: { bsonType: 'string' }, convenientTimeToCall: { bsonType: 'string' }, presentAddress: { bsonType: 'string' }, permanentAddress: { bsonType: 'string' }, nidNumber: { bsonType: 'string' }, passportNumber: { bsonType: 'string' }, altPhone: { bsonType: 'string' } }
                },
                personalActivities: {
                    bsonType: 'object',
                    required: [],
                    properties: { hobbies: { bsonType: 'array', items: {} }, interests: { bsonType: 'array', items: {} }, favouriteMusic: { bsonType: 'array', items: {} }, favouriteReads: { bsonType: 'array', items: {} }, preferredMovies: { bsonType: 'array', items: {} }, sports: { bsonType: 'array', items: {} }, favouriteCuisine: { bsonType: 'array', items: {} }, preferredDressStyle: { bsonType: 'array', items: {} } }
                },
                profileUpdateRange: { bsonType: 'int' },
                profileUpdateStep: { bsonType: 'int' },
                isVerified: { bsonType: 'bool' },
                isLocked: { bsonType: 'bool' },
                assignToAdmin: { bsonType: 'objectId' },
                activeStatus: { bsonType: 'string' },
                adminSms: {
                    bsonType: 'object',
                    required: [],
                    properties: {
                        count: { bsonType: 'int' },
                        messages: {
                            bsonType: 'array',
                            items: {
                                required: [],
                                properties: { reciverId: { bsonType: 'string' }, senderId: { bsonType: 'string' }, message: { bsonType: 'string' } }
                            }
                        }
                    }
                },
                packageInfo: {
                    bsonType: 'object',
                    required: [],
                    properties: { packageId: { bsonType: 'string' }, activationDate: { bsonType: 'date' }, expiredDate: { bsonType: 'date' } }
                },
                uploadImages: {
                    bsonType: 'array',
                    items: {
                        required: [],
                        properties: { blurImage: { bsonType: 'string' }, clearImage: { bsonType: 'string' } }
                    }
                },
                isChecked: { bsonType: 'bool' },
                loggedinAt: { bsonType: 'date' },
                loggedOutAt: { bsonType: 'date' },
                isDisable: {
                    bsonType: 'object',
                    required: ['status', 'disabledTime', 'disabledBy'],
                    properties: { status: { bsonType: 'bool' }, disabledTime: { bsonType: 'date' }, disabledBy: { bsonType: 'objectId' } }
                },
                connections: { bsonType: 'array', items: { bsonType: 'objectId' } },
                favouriteList: { bsonType: 'array', items: { bsonType: 'objectId' } },
                blockList: { bsonType: 'array', items: { bsonType: 'objectId' } },
                reportedPhotoList: { bsonType: 'array', items: { bsonType: 'objectId' } },
                timelinePosts: {
                    bsonType: 'array',
                    items: {
                        required: [],
                        properties: { count: { bsonType: 'int' }, posts: { bsonType: 'array', items: { bsonType: 'objectId' } } }
                    }
                },
                recentlyViewed: { bsonType: 'array', items: { bsonType: 'objectId' } },
                createdAt: { bsonType: 'date' },
                updatedAt: { bsonType: 'date' },
                isDelete: {
                    bsonType: 'object',
                    required: [],
                    properties: { status: { bsonType: 'bool' }, date: { bsonType: 'date' } }
                }
            }
        }
    }
});