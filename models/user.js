let mongoose = require('mongoose');

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
		trim: true
		// TODO Add email regex validation
	},
	password: {
		// TODO Find best default password hashing method and if it has a specific mongo schema type
		type: String,
		required: true,
		min: 4
	}
});

var model = mongoose.model('User', schema);

module.exports = model;
