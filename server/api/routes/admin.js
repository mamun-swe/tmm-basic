const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/admin/user/UsersController");
const ReligionController = require("../controllers/admin/user/ReligionController");
const CountryController = require("../controllers/admin/user/CountryController");
const BranchController = require("../controllers/admin/user/BranchController");
const LanguageController = require("../controllers/admin/user/LanguageController");
const BasicAndLifestyleController = require("../controllers/admin/user/BasicAndLifestyleController");
const ContactInfoController = require("../controllers/admin/user/ContactInfoController");
const ActivityController = require("../controllers/admin/user/ActivityController");
const QualificationController = require("../controllers/admin/user/QualificationController")

// Users
router.get('/user/index', UsersController.Index)
router.get('/user/create', UsersController.CreateUser)
router.get('/user/show/:email', UsersController.Show)
router.get('/user/search', UsersController.SearchUser)
router.put('/user/primaryinfo/update', UsersController.UpdatePrimaryInfo);
router.put('/user/profile-picture/:email/update', UsersController.UpdateProfilePicture);
router.put('/user/profile/description/:email/update', UsersController.UpdateShortDescription)
router.put('/user/profile/activity', UsersController.UpdateActivities)
router.get('/user/partner-preference/info', UsersController.PartnerPreferenceData)


// Religion
router.get("/religion", ReligionController.Index);
router.post("/religion", ReligionController.Create);
router.post("/religion/socialorder", ReligionController.CreateSocialOrder);

// Country
router.get("/country", CountryController.Index);
router.post("/country", CountryController.Create);

// Branch
router.get("/branch", BranchController.Index);
router.post("/branch", BranchController.Store);

// Language
router.get("/language/index", LanguageController.Index);
router.post("/language/store", LanguageController.Store);

// Basic & Lifestyle
router.post("/basic-and-lifestle/store", BasicAndLifestyleController.Store);

// Contact Information
router.post("/contactinfo/store", ContactInfoController.Store);

// Activity
router.get("/activity/index", ActivityController.Index);
router.post("/activity/store/hobbi", ActivityController.StoreHobbi);
router.post("/activity/store/interest", ActivityController.StoreInterest);
router.post("/activity/store/music", ActivityController.StoreMusic);

// Qualification
router.get("/qualification", QualificationController.Index)
router.post("/qualification/store", QualificationController.Store)

module.exports = router;
