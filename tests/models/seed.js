const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const Todo = require('../../models/todo');
const User = require('../../models/user');
const {SECRET_KEY} = require('../../utils/config');

let todoSeedCount = 5;
let todos = [];

for(let i=todoSeedCount; i>=0; i--) {

  let todoObj = {
    _id: new ObjectID(),
    title: `Sample ${i}`,
    description: `Description for Sample ${i}`
  };

  todos.push(todoObj);
}

let populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos).then((docs) => { done(); }, (err) => { done(err); });
  }, (err) => {
    return done(err);
  });
};

let userSeedCount = 5;
let users = [];

for(let i=userSeedCount; i>=0; i--) {
  let id = new ObjectID();

  let userObj = {
    _id: id,
    username: `test_user_${i}`,
    email: `testemail${i}@testmail.com`,
    password: 'Testing1234',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: id.toHexString(), access: 'auth'}, SECRET_KEY).toString()
    }]
  };

  users.push(userObj);
}

// todo uncomment when implementing admin-level api endpoints
// let adminId = new ObjectID();

// let adminUserObj = {
//   _id: id,
//   username: 'admin',
//   email: 'dtromblee@gmail.com',
//   password: 'dkt117899',
//   tokens: {
//     access: 'auth',
//     token: jwt.sign({_id: adminId.toHexString(), 'auth'}, SECRET_KEY).toString()
//   }
// };
//
// users.push(adminUserObj);

let populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    let results = [];

    users.forEach((user) => {
       results.push(new User(user).save());
    });

    return Promise.all(results);
  })
    .then(() => {done();})
    .catch((err) => {done(err);});
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
