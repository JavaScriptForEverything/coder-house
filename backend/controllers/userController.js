// const User = require('../models/userModel')
// const { filterObjectByArray } = require('../utils')
// const { catchAsync, appError } = require('./errorController')

// // PATCH 	/api/users/:id
// exports.updateUser = catchAsync(async (req, res, next) => {
// 	const userId = req.query.id
// 	const body = req.body

// 	body.isActive = undefined
// 	body.avatar = undefined

// 	const user = await User.findByIdAndUpdate(userId, body, { new: true })
// 	if( !user ) return next(appError('user not found'))

// 	const allowedFields = ['_id', 'phone', 'isAuth', 'isActive', 'name', 'avatar', 'createdAt']
// 	const filteredUser = filterObjectByArray(user._doc, allowedFields)

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			message: 'user is active',
// 			isAuth: true, 		
// 			user: filteredUser
// 		},
// 	})
// })
