const { Schema, model } = require("mongoose");

const validateEmail = function (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    profileId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    baranchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please provide a valid email address"],
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      enum: ["Male", "Female"],
    },
    lookingFor: {
      type: String,
      trim: true,
      required: true,
      enum: ["Bride", "groom"],
    },
    dob: {
      type: Date,
      trim: true,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
      required: true,
    },
    socialOrder: {
      type: String,
      trim: true,
      required: true,
    },
    birthCountry: {
      type: String,
      trim: true,
      required: true,
    },
    livingCountry: {
      type: String,
      trim: true,
      default: null,
    },

    // language: {
    //     motherTongue: {
    //         type: String,
    //         trim: true,
    //         default: null
    //     },
    //     spokenLanguage: [{
    //         type: String,
    //         trim: true,
    //         default: null
    //     }]
    // },
    // profileCreatedFor: {
    //     type: String,
    //     trim: true,
    //     default: "own",
    //     enum: ["own", "sister", "brother", "daughter", "son", "friend", "other"]
    // },

    profilePicture: {
      blurImage: {
        type: String,
        trim: true,
        default: null,
      },
      clearImage: {
        type: String,
        trim: true,
        default: null,
      },
    },
    // shortDescription: {
    //     type: String,
    //     trim: true,
    //     default: null,
    //     maxlength: 350
    // },

    // profileCreatorId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     default: null
    // },
    // createdProfilesId: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     default: null
    // }],

    // profileUpdateRange: {
    //     type: Number,
    //     trim: true,
    //     default: 0,
    //     enum: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    // },
    // profileUpdateStep: {
    //     type: Number,
    //     trim: true,
    //     default: 0,
    //     enum: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    // },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    //     enum: [true, false]
    // },
    // isLocked: {
    //     type: Boolean,
    //     default: false,
    //     enum: [true, false]
    // },
    // assignToAdmin: {
    //     type: Schema.Types.ObjectId,
    //     default: null
    // },
    // activeStatus: {
    //     type: String,
    //     default: 'deactivated',
    //     enum: ['activated', 'deactivated']
    // },
    // adminMessages: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'AdminMessage',
    //     default: null
    // }],
    // packageInfo: {
    //     packageId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Package',
    //         deafult: null
    //     },
    //     activationDate: {
    //         type: Date,
    //         trim: true,
    //         deafult: null
    //     },
    //     expiredDate: {
    //         type: Date,
    //         trim: true,
    //         deafult: null
    //     }
    // },
    // uploadImages: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserImage',
    //     deafult: null
    // }],
    // isChecked: {
    //     type: Boolean,
    //     deafult: false,
    //     enum: [true, false]
    // },
    // loggedinAt: {
    //     type: Date,
    //     trim: true,
    //     deafult: null
    // },
    // loggedOutAt: {
    //     type: Date,
    //     trim: true,
    //     deafult: null
    // },
    // isDisable: {
    //     status: {
    //         type: Boolean,
    //         deafult: false,
    //         enum: [true, false]
    //     },
    //     disabledTime: {
    //         type: Date,
    //         trim: true,
    //         deafult: null
    //     },
    //     disabledBy: {
    //         type: Date,
    //         trim: true,
    //         deafult: null
    //     }
    // },

    // connections: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     deafult: null
    // }],
    // favouriteList: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     deafult: null
    // }],
    // blockList: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     deafult: null
    // }],
    // reportedPhotoList: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserImage',
    //     deafult: null
    // }],
    // timelinePosts: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Post',
    //     deafult: null
    // }],
    // recentlyViewed: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserImage',
    //     deafult: null
    // }],
    // isDelete: {
    //     status: {
    //         type: Boolean,
    //         trim: true,
    //         deafult: false,
    //         enum: [false, false]
    //     },
    //     date: {
    //         type: Date,
    //         trim: true,
    //         deafult: null
    //     }
    // },

    basicAndLifestyleInformation: {
      type: Schema.Types.ObjectId,
      ref: "BasicAndLifestyle",
      default: null,
    },
    contactInformation: {
      type: Schema.Types.ObjectId,
      ref: "ContactInfo",
      default: null,
    },
    personalActivities: {
      hobbies: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      interests: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      favouriteMusic: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      favouriteReads: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      preferredMovies: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      sports: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
      favouriteCuisine: [
        {
          type: String,
          trim: true,
          default: null,
        },
      ],
    },

    ///////////////////////////////////////////////// New Collection ////////////////////////////////////////////////////
    // partnerPreference: {
    //     ageRange: {
    //         startFrom: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         },
    //         endTo: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         }
    //     },
    //     heightRange: {
    //         startFrom: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         },
    //         endTo: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         }
    //     },
    //     materialStatus: [{
    //         type: String,
    //         trim: true,
    //         default: "unmarried",
    //         enum: ["unmarried", "divorced"]
    //     }],
    //     religion: [{
    //         type: String,
    //         trim: true,
    //         default: null
    //     }],
    //     community: [{
    //         type: String,
    //         trim: true,
    //         default: null
    //     }],
    //     motherTounge: [{
    //         type: String,
    //         trim: true,
    //         default: null
    //     }],
    //     location: {
    //         Country: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         },
    //         State: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         },
    //         City: {
    //             type: String,
    //             trim: true,
    //             default: null
    //         }
    //     },
    //     educationAndProfession: {
    //         qualification: [{
    //             type: String,
    //             trim: true,
    //             default: null
    //         }],
    //         workingWith: [{
    //             type: String,
    //             trim: true,
    //             default: null
    //         }],
    //         professionArea: [{
    //             type: String,
    //             trim: true,
    //             default: null
    //         }],
    //         annualIncome: {
    //             matter: {
    //                 type: String,
    //                 trim: true,
    //                 default: null
    //             },
    //             range: {
    //                 startFrom: {
    //                     type: String,
    //                     trim: true,
    //                     default: null
    //                 },
    //                 endTo: {
    //                     type: String,
    //                     trim: true,
    //                     default: null
    //                 }
    //             }
    //         }
    //     },
    //     diet: [{
    //         type: String,
    //         trim: true,
    //         default: null
    //     }]
    // },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
