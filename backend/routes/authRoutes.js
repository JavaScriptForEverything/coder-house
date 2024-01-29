const { Router } = require('express')
const authController = require('../controllers/authController')
// const userController = require('../controllers/userController')

// /api/auth
const router = Router()

router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOTP)
router.post('/active-user', authController.auth, authController.activeUser)


module.exports = router