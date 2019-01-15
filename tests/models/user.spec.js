const expect = require('expect');
const request = require('supertest');

const app = require('../../server');
const User = require('../../models/user');
const {users, populateUsers} = require('./seed.js');

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
});
