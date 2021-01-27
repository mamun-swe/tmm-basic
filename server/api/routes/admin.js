const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/admin/UsersController')
const ReligionController = require('../controllers/admin/ReligionController')
const CountryController = require('../controllers/admin/CountryController')
const BranchController = require('../controllers/admin/BranchController')
const LanguageController = require('../controllers/admin/LanguageController')
const BasicAndLifestyleController = require('../controllers/admin/BasicAndLifestyleController')

// Users
router.get('/index', UsersController.Index)
router.get('/show/:email', UsersController.Show)

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

module.exports = router
