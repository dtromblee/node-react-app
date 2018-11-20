const express = require('express');
const UserService = require('../classes/user-service');

let router = express.Router();
let userService = new UserService();

router.get('/', (req, res) => {
  res.send(JSON.stringify(userService.getUsers(), null, 3));
});

router.get('/:id', (req, res) => {
  res.send(JSON.stringify(userService.getUser(), null, 3));
});

router.post('/', (req, res) => {
  let success = userService.addUser(req.body);

  if (success) {
    res.send('New user created.');
  } else {
    res.status(500);
    res.send('Error: user coundn\'t be created');
  }
});

router.delete('/', (req, res) => {
  let success = userService.removeUser(req.body.username);

  if (success) {
    res.send(`User { ${req.body.username} } deleted.`);
  } else {
    res.status(500);
    res.send('Error: user couldn\'t be deleted.');
  }
});

module.exports = router;
