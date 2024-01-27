const User = require('../models/userModel')

exports.findUser = async (filter) => {
	return await User.findOne(filter)
}
exports.createUser = async (data) => {
	return await User.create(data)
}