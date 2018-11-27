const UserService = require('./controllers/user-service');
const AuthService = require('./controllers/auth-service');

let userService = new UserService();
let authService = new AuthService();

let newUser = {
    "username": "lala",
    "email": "lnjvnc@gmail.com",
    "password": "secret03"
};

debugger;
userService.addUser(newUser);

console.log(JSON.stringify(userService.getUsers(), null, 2));

userService.removeUser(newUser.username);

console.log(JSON.stringify(userService.getUsers(), null, 2));

// let username = 'dtromblee';
// let password = 'Test';
// console.log(authService.authenticate(username, password));
