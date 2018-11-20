class User {
	constructor(userObj) {
		if (!(User.isValidUser(userObj))) throw new Error('Error: Invalid User Configuration');

		this.username = userObj.username,
		this.email = userObj.email,
		this.password = userObj.password;
	}

	info() {
		console.log(`${this.username} ${this.email} ${this.password}`);
	}

	static isValidUser(userObj) {
		return !!(userObj.username &&
			userObj.email &&
			userObj.password);
	}
}

module.exports = User;
