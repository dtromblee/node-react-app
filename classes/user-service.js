const fs = require('fs');
const _ = require('lodash');
const User = require('./user');
const Helpers = require('../util/helpers');

class UserService {
	// TODO: Rebuild using promises. Seems like bluebird is the best library by general internet consensus
	constructor() {}

	addUser(userObj) {
		let user = new User(userObj);
		let duplicateUsers = this.getUser(user.username);
		console.log('Duplicate Users', duplicateUsers);

		if (duplicateUsers && duplicateUsers.length > 0) {
			console.error('Error adding user; user already exists');
			return false;
		}

		let users = this.getUsers();

		user.id = Helpers.topId(users) + 1;
		users.push(user);

		this.saveUsers(users);
		return true;
	}

	updateUser(userObj) {
		let user = new User(userObj);

		if (!(this.getUser(user.username))) {
			console.error('Error updating user; user doesn\'t exist');
			return;
		}

		let users = this.getUsers();

		let updatedUsers = users.map(function(val, i, arr) {
			if (user.username === arr[i].username) {
				return {
					username: user.username,
					email: user.email,
					password: user.password
				};
			} else {
				return val;
			}
		});

		this.saveUsers(updatedUsers);
	}

	getUsers() {
		let usersObj;

		this.usersCache = this.usersCache ? this.usersCache : this.instantiateUsers();
		return this.usersCache;
	}

	instantiateUsers() {
		let usersObj;
		console.log('Instantaite start');
		try {
			usersObj = JSON.parse(fs.readFileSync('./data/users.json'));
		} catch (e) {
			console.log('users.json doesn\'t exist: returning empty user array');
			usersObj = [];
		}
		console.log('First getUsers instantiation');
		return usersObj instanceof Array ? usersObj: [usersObj];
	}

	getUser(username) {
		let users = this.getUsers();
		let user = users.filter(function(user) {return user.username === username;})[0];
		return user ? (user instanceof Array ? user : [user]) : [];
	}

	saveUsers(users) {
		// TODO Figure out data integrity validation
		let usersJson = JSON.stringify(users);
		fs.writeFileSync('./data/users.json', usersJson);
	}

	removeUser(username) {
		let users = this.getUsers();
		let filteredUsers = users.filter(function(user) { return user.username != username; });
		this.saveUsers(filteredUsers);

		return users.length > filteredUsers.length;
	}

}

module.exports = UserService;
