const express = require("express");
const router = express.Router();
const Permission = require('../middleware/Permession')
const UsersController = require("../controllers/admin/user/UsersController");
const ReligionController = require("../controllers/admin/user/ReligionController");
const CountryController = require("../controllers/admin/user/CountryController");
const BranchController = require("../controllers/admin/user/BranchController");
const LanguageController = require("../controllers/admin/user/LanguageController");
const BasicAndLifestyleController = require("../controllers/admin/user/BasicAndLifestyleController");
const ContactInfoController = require("../controllers/admin/user/ContactInfoController");
const ActivityController = require("../controllers/admin/user/ActivityController");
const QualificationController = require("../controllers/admin/user/QualificationController");
const WorkingWithController = require("../controllers/admin/user/WorkingWithController")
const PartnerPreferenceController = require("../controllers/admin/user/PartnerPreferenceController")
const ProfessionAreaController = require("../controllers/admin/user/ProfessionAreaController")
const AuthController = require("../controllers/admin/Auth/AuthController")

// Authentication
router.get('/auth/index', Permission.isAdmin, AuthController.Index)
router.post('/auth/register', AuthController.Register)
router.post('/auth/login', AuthController.Login)
router.get('/auth/logout', AuthController.Logout)

// Users
router.get('/user/index', Permission.isAdmin, UsersController.Index)
router.get('/user/create', Permission.isAdmin, UsersController.CreateUser)
router.get('/user/show/:email', Permission.isAdmin, UsersController.Show)
router.get('/user/search', Permission.isAdmin, UsersController.SearchUser)
router.put('/user/primaryinfo/update', Permission.isAdmin, UsersController.UpdatePrimaryInfo);
router.put('/user/profile-picture/:email/update', Permission.isAdmin, UsersController.UpdateProfilePicture);
router.put('/user/profile/description/:email/update', Permission.isAdmin, UsersController.UpdateShortDescription)
router.put('/user/profile/activity', Permission.isAdmin, UsersController.UpdateActivities)
router.get('/user/partner-preference/info', Permission.isAdmin, UsersController.PartnerPreferenceData)

// Religion
router.get("/religion", Permission.isAdmin, ReligionController.Index);
router.post("/religion", Permission.isAdmin, ReligionController.Create);
router.post("/religion/socialorder", Permission.isAdmin, ReligionController.CreateSocialOrder);

// Country
router.get("/country", Permission.isAdmin, CountryController.Index);
router.post("/country", Permission.isAdmin, CountryController.Create);

// Branch
router.get("/branch", Permission.isAdmin, BranchController.Index);
router.post("/branch", Permission.isAdmin, BranchController.Store);

// Language
router.get("/language/index", Permission.isAdmin, LanguageController.Index);
router.post("/language/store", Permission.isAdmin, LanguageController.Store);

// Basic & Lifestyle
router.post("/basic-and-lifestle/store", Permission.isAdmin, BasicAndLifestyleController.Store);

// Contact Information
router.post("/contactinfo/store", Permission.isAdmin, ContactInfoController.Store);

// Activity
router.get("/activity/index", Permission.isAdmin, ActivityController.Index);
router.post("/activity/store/hobbi", Permission.isAdmin, ActivityController.StoreHobbi);
router.post("/activity/store/interest", Permission.isAdmin, ActivityController.StoreInterest);
router.post("/activity/store/music", Permission.isAdmin, ActivityController.StoreMusic);
router.post("/activity/store/read", Permission.isAdmin, ActivityController.StoreRead);
router.post("/activity/store/movie", Permission.isAdmin, ActivityController.StoreMovie);

// Partner preference 
router.post("/partnerpreference/create", PartnerPreferenceController.Create)

// Qualification
router.get("/qualification", Permission.isAdmin, QualificationController.Index)
router.post("/qualification/store", Permission.isAdmin, QualificationController.Store)

// Working with 
router.get("/working-with", Permission.isAdmin, WorkingWithController.Index)
router.post("/working-with/store", Permission.isAdmin, WorkingWithController.Store)

// Profession area
router.get("/profession", Permission.isAdmin, ProfessionAreaController.Index)
router.post("/profession/store", Permission.isAdmin, ProfessionAreaController.Store)

module.exports = router;
