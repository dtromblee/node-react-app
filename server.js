const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const UserService = require('./classes/user-service');

var app = express();
var port = 3000;

var userService = new UserService();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // Enable JSON body support

app.get('/users', (req, res) => {
  res.send(JSON.stringify(userService.getUsers(), null, 3));
});

app.post('/user', (req, res) => {
  let success = userService.addUser(req.body);

  if (success) {
    res.send('New user created.');
  } else {
    res.status(500);
    res.send('Error: user coundn\'t be created');
  }
});

app.delete('/user', (req, res) => {
  console.log('here');
  let success = userService.removeUser(req.body.username);

  if (success) {
    res.send(`User ${req.body.username} deleted.`);
  } else {
    res.status(500);
    res.send('Error: user couldn\'t be deleted.');
  }
});

app.get('/adminInfo', (req, res) => {
  res.status(403);
  res.send('Uh uh uh! Didn\'t say the magic word!');
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
