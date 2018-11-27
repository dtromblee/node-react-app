const assert = require('assert');
const User = require('../models/user');

describe('Class: User', () => {
  const validTestUserObj = {
    "username": "lala",
    "email": "lnjvnc@gmail.com",
    "password": "secret03"
  };

  const invalidTestUserObj = {
    "username": "lala",
    "fakemail": "lnjvnc@gmail.com",
    "password": "secret03"
  };

  describe('.contructor()', () => {

    it('should create a new user instance when passed the correct config (username, email, password)', () => {
      let user;

      try {
        user = new User(validTestUserObj);
      } catch (e) {
        user = undefined;
      }

      assert.equal(user instanceof User, true);
    });

    it('should have the "username", "email" and "password" properties set as per passed config object', () => {
      let user;

      try {
        user = new User(validTestUserObj);
      } catch (e) {
        user = undefined;
      }

      assert.equal(user.username, validTestUserObj.username);
      assert.equal(user.email, validTestUserObj.email);
      assert.equal(user.password, validTestUserObj.password);
    });

    it('should return an error if passed config object is not defined correctly', () => {
      let user;

      try {
        user = new User(invalidTestUserObj);
      } catch (e) {
        user = undefined;
        var userError = e;
      }

      assert.equal(userError instanceof Error, true);
    });
  });
  describe('#isValidUser', () => {
    it('should return true if passed user config contains "username", "email" and "password" properties', () => {
      assert.equal(User.isValidUser(validTestUserObj), true);
    })
    it('should return false if passed invalid user config e.g. does not contain "username", "email" and "password" properties', () => {
      assert.equal(User.isValidUser(invalidTestUserObj), false);
    })
  });
});
