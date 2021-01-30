const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/admin/user/UsersController')
const ReligionController = require('../controllers/admin/user/ReligionController')
const CountryController = require('../controllers/admin/user/CountryController')
const BranchController = require('../controllers/admin/user/BranchController')
const LanguageController = require('../controllers/admin/user/LanguageController')
const BasicAndLifestyleController = require('../controllers/admin/user/BasicAndLifestyleController')
const ContactInfoController = require('../controllers/admin/user/ContactInfoController')
const ActivityController = require('../controllers/admin/user/ActivityController')

// Users
router.get('/index', UsersController.Index)
router.get('/show/:email', UsersController.Show)
router.put('/user/primaryinfo/update', UsersController.UpdatePrimaryInfo);
router.put('/user/profile/activity', UsersController.UpdateActivities)


// Religion
router.get('/religion', ReligionController.Index)
router.post('/religion', ReligionController.Create)
router.post('/religion/socialorder', ReligionController.CreateSocialOrder)

// Country
router.get('/country', CountryController.Index)
router.post('/country', CountryController.Create)

// Branch
router.get('/branch', BranchController.Index)
router.post('/branch', BranchController.Store)

// Language
router.get('/language/index', LanguageController.Index)
router.post('/language/store', LanguageController.Store)

// Basic & Lifestyle 
router.post('/basic-and-lifestle/store', BasicAndLifestyleController.Store)

// Contact Information
router.post('/contactinfo/store', ContactInfoController.Store)

// Activity
router.get('/activity/index', ActivityController.Index)
router.post('/activity/store/hobbi', ActivityController.StoreHobbi)
router.post('/activity/store/interest', ActivityController.StoreInterest)
router.post('/activity/store/music', ActivityController.StoreMusic)



module.exports = router