let mongoose = require('mongoose');
let validator = require('validator');

let schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		max: 32
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
		// TODO Add email regex validation
	},
	password: {
		// TODO Find best default password hashing method and if it has a specific mongo schema type
		type: String,
		required: true,
		min: 8
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

var model = mongoose.model('User', schema);

module.exports = model;
