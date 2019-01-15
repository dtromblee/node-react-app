let mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {SECRET_KEY} = require('../utils/config');
const bcrypt = require('bcryptjs');

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
	let access = 'auth';
	let token = jwt.sign({_id: this._id.toHexString(), access}, SECRET_KEY).toString();

	this.tokens.push({access, token});
	return this.save().then(() => {
		return token;
	});
};

schema.statics.findByToken = function(token) {
	let decoded = undefined;

	try {
		decoded = jwt.verify(token, SECRET_KEY);
	} catch (e) {
		return Promise.reject();
	}

	return this.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

schema.pre('save', function(next) {
	if (this.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
					this.password = hash;
					next();
			});
		});
	} else {
		next();
	}
});

var model = mongoose.model('User', schema);

module.exports = model;
