const expect = require('expect');
const request = require('supertest');

const app = require('../../server');
const User = require('../../models/user');
const {users, newUsers, populateUsers} = require('./seed.js');

describe('User API', () => {
  beforeEach(populateUsers);

  describe('GET /users', () => {});

  describe('GET /users/me', () => {
    let currentUser = users[0];

    it('should return a 401 if the user is not authenticated', (done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .end(done);
    });

    it('should return a user\'s id, username and email if the user is authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          console.log('res', res.body);
          expect(res.body._id).toBe(currentUser._id.toString());
          expect(res.body.username).toBe(currentUser.username);
          expect(res.body.email).toBe(currentUser.email);
        })
        .end(done);
    });
  });

  describe('POST /users', () => {
    let badNewUser = {
      username: 'bob'
    };

    it('should return a 400 if the correct data isn\'t provided', (done) => {
      request(app)
        .post('/users')
        .send(badNewUser)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });

    it('should create a new user if their username and email are unique', (done) => {
      request(app)
        .post('/users')
        .send(newUsers[0])
        .expect(200)
        .expect((res) => {
          expect(res.body.user.username).toBe(newUsers[0].username);
          expect(res.body.user.email).toBe(newUsers[0].email);


        })
        .end(done);
    });

    it('should return a 400 if new user\'s email is not unique', (done) => {
      let existingUser = {
        username: users[0].username,
        email: users[0].email,
        password: users[0].password
      };

      request(app)
        .post('/users')
        .send(users[0])
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });
  });

  describe('POST /users/login', () => {
    it('should return a 400 for an incorrect email or password', (done) => {
      let badCredentials = {
        email: users[0].email,
        password: 'letmein'
      };

      request(app)
        .post('/users/login')
        .send(badCredentials)
        .expect(400)
        .end(done);
    });

    it('should return the user\'s id, username and email, as well as set auth token, when provided correct credentials', (done) => {
      let goodCredentials = {
        email: users[0].email,
        password: users[0].password
      };

      request(app)
        .post('/users/login')
        .send(goodCredentials)
        .expect(200)
        .expect((res) => {
          // console.log('***res***', res);
          expect(res.body._id).toBe(users[0]._id.toString());
          expect(res.body.email).toBe(users[0].email);
          expect(res.body.username).toBe(users[0].username);
          expect(res.headers['x-auth']).toBe(users[0].tokens[0].token);
        })
        .end(done);
    });
  });
});
