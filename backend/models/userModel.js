const { Schema, models, model } = require('mongoose');

const userSchema = new Schema({

	phone: {
		type: String,
		unique: true,
		trim: true,
		minlength: 7,
		maxlength: 15
	},
	isActive: {
		type: Boolean,
		default: false
	}

}, { 
	timestamps: true
})

const User = models.User || model('User', userSchema)
module.exports = User