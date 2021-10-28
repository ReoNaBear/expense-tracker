const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const { authenticator } = require('../middleware/auth')
const users = require('./modules/users')
const auth = require('./modules/auth')


router.use('/users', users)
router.use('/auth', auth)

router.use('/', authenticator, home)

module.exports = router