class User {
	constructor(config) {
		this.username = config.username,
		this.email = config.email,
		this.password = config.password;
	}

	info() {
		console.log(`${this.username} ${this.email} ${this.password}`);
	}

	isValid(userObj) {
		return userObj.username &&
			userObj.email &&
			userObj.password;
	}
}

module.exports = User;
