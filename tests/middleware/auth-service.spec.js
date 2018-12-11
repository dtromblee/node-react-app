const UserService = require('../../middlewares/user-service');
const AuthService = require('../../middlewares/auth-service');
const assert = require('assert');

let testUsername = undefined;
let testUserPassword = 'Testing1234';
//
// describe('AuthService', () => {
//   let userService = new UserService();
//   let authService = new AuthService();
//
//   beforeEach((done) => {
//     testUsername = `test_user_${Date.now()}`;
//
//     let testUserObj = {
//       username: testUsername,
//       email: 'test@test.com',
//       password: testUserPassword
//     };
//
//     userService.addUser(testUserObj);
//     done();
//   });
//
//   afterEach((done) => {
//     userService.removeUser(testUsername);
//     testUsername = undefined;
//     done();
//   });
//
//   describe('.authenticate()', () => {
//     it('should return true if provided a valid username/password combination', () => {
//       let success = authService.authenticate(testUsername, testUserPassword);
//       assert.equal(success, true);
//     });
//   });
//
//   describe('.resetPassword', () => {
//     it('should update the user\'s password if the correct original username and password are provided', () => {
//       let newUserPassword = 'Testing12345';
//
//       authService.resetPassword(testUsername, testUserPassword, newUserPassword);
//
//       let resetUser = userService.getUser(testUsername);
//
//       assert.equal(resetUser.password, newUserPassword);
//     })
//   })
// });
