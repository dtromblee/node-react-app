let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		min: 1,
	},
	description: {
		type: String,
		required: false,
		trim: true,
    min: 1
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
    default: null
	},

});

var model = mongoose.model('Todo', schema);

module.exports = model;
