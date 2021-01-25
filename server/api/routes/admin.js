const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/admin/UsersController')
const ReligionController = require('../controllers/admin/ReligionController')

router.get('/index', UsersController.Index)
router.get('/show/:email', UsersController.Show)

router.get('/religion', ReligionController.Index)
router.post('/religion', ReligionController.Create)

module.exports = router
