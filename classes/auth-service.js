const UserService = require('./user-service.js');

let userService = new UserService();

class AuthService {
	authenticate(username, password) {
		let user = userService.getUser(username);
		return user.password === password;
	}

	resetPassword(username, oldPassword, newPassword) {
		if (!this.authenticate(username, oldPassword)) {
			console.error(`Password reset for user ${username} failed; incorrect credentials`);
			return false;
		}

		let user = userService.getUser(username);
		user.password = newPassword;

		userService.updateUser(user);
	}
}
module.exports = AuthService; 
