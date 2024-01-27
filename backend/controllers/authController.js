const { catchAsync, appError } = require('./errorController')
const otpService = require('../services/otpService')
const hashService = require('../services/hashService')
const userService = require('../services/userService')
const tokenService = require('../services/tokenService')


// POST 	/api/send-otp 
/* We can store hashed otp in database:
		. store into database is reduce complexity
		. send user both otp and hashedOTP + expires date  + phone number: when need to varify get from user again.
*/
exports.sendOTP = catchAsync( async(req, res, next) => {
	const { phone } = req.body

	// Step-1: 
	const otp = await otpService.generateOTP()

	/* Step-2: To send user otp and hashedOtp too, so that no need to store 
						into database, and later get hashedOtp back from client to validate
	*/
	const ttl = 1000 * 60 * 50 						// => TTL = Time To Live
	const expires = Date.now() + ttl
	const data = `${phone}.${otp}.${expires}`
	const hashedOtp = await hashService.hashOTP(data)

	// Step-3: 
	/*
	try {
		await otpService.sendSMS() 				// get twilio details first

	} catch (error) {
		return next(appError(error.message, 'OTP_error'))		
	}
	*/

	res.status(200).json({
		status: 'success',
		data: {
			message: `an message is send to you via SMS: ${otp}`, 	// don't send OTP here (for testing only)
			phone,
			hash: `${hashedOtp}.${expires}`, 												// send phone, expires + hashedOTP which will be require later
		}
	})
})


// POST 	/api/verify-otp 
exports.verifyOTP = catchAsync( async (req, res, next) => {
	const { phone, otp, hash } = req.body

	if(!phone || !otp || !hash) return next(appError('you must send: { phone, otp, hash: hashedOTP }'))

	// step-1: check expires
	const [ hashedOTP, expires ] = hash.split('.')

	const isValidHashed = expires > Date.now()
	if(!isValidHashed) return next(appError('your OTP expires, please collect new OTP'))

	// step-2: check hashed hash
	const data = `${phone}.${otp}.${expires}` 			// get the same pattern from send otp
	const isValid = await hashService.validateOTP(data, hashedOTP)
	if(!isValid) return next(appError('hashed otp violated'))

	// step-3: Create user
	let user = null
	user = await userService.findUser({ phone })
	if(!user) {
		user = await userService.createUser({ phone })
		if(!user) return next(appError('userCreate failed'))
	}

	// step-4: Generate token
	const payload = {
		id: user.id,
		phone: user.phone,
		isActive: user.isActive,
	}
	const { accessToken, refreshToken } = await tokenService.generateTokens(payload)

	// step-5: Send refreshToken with cookie
	res.cookie('refreshToken', refreshToken, {
		maxAge: 1000 * 60 * 60 * 24 * 30, 				// expres require new Date(), but maxAge just value
		httpOnly: true
	})

	res.status(200).json({
		status: 'success',
		data: {
			message: 'your registration is success',
			accessToken
		},
	})
})
