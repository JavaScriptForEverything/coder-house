const { Router } = require('express')
// const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// /api
const router = Router()

router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOTP)


module.exports = router