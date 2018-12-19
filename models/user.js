let mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let schema = new mongoose.Schema({
	username: {
		type: 'String',
		required: true,
		trim: true,
		min: 3,
		max: 32

	},
	email: {
		type: 'String',
		required: true,
		trim: true,
		unique: true,
		dropDups: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		// TODO Find best default password hashing method and if it has a specific mongo schema type
		type: 'String',
		required: true,
		min: 8
	},
	tokens: [{
		access: {
			type: 'String',
			required: true
		},
		token: {
			type: 'String',
			required: true
		}
	}]
});

schema.methods.toJSON = function() {
	return _.pick(this.toObject(), ['_id', 'username', 'email']);
};

schema.methods.generateAuthToken = function() {
	let salt = 'rapiddeploymentsalmondrops';
	let access = 'auth';
	let token = jwt.sign({_id: this._id.toHexString(), access}, salt).toString();

	this.tokens.push({access, token});
	return this.save().then(() => {
		return token;
	});
};

var model = mongoose.model('User', schema);

module.exports = model;
