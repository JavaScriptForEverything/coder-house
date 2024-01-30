const { Router } = require('express')
const authController = require('../controllers/authController')
const tokenController = require('../controllers/tokenController')

// /api/auth
const router = Router()

router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOTP)
router.patch('/active-user', authController.auth, authController.activeUser)

router.get('/refresh-token', tokenController.refreshToken)

module.exports = router