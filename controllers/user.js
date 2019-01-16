const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {authenticate} = require('../middlewares/authenticate');

let router = express.Router();

router.get('/', (req, res) => {
  User.find({})
    .then((results) => {
      res.send({results});
    }, (err) => {
      res.status(404).send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

// router.get('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then((result) => {
//       if(result) {
//         res.send({result});
//       } else {
//         res.status(404).send('User not found');
//       }
//     }, (err) => {
//       res.send(err);
//     })
//     .catch((err) =>  {
//       res.status(400).send(err);
//     });
// });

router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.post('/', (req, res) => {
  let validValues = _.pick(req.body, ['username', 'email', 'password'])
  let user = new User(validValues);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    }, (err) => {
      res.status(400).send({});
    })
    .then((token) => {
      res.header('x-auth', token).send({user});
    }, (err) => {
      res.status(400).send({});
    })
    .catch((err) => {
      res.status(400).send({});
    });
});

router.post('/login', (req, res) => {
  let validValues = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(validValues.email, validValues.password)
    .then((user) => {
        let data = _.pick(user, ['_id', 'username', 'email']);
        res.header('x-auth', user.tokens[0].token).send(data);
    })
    .catch((err) => {
      res.status(400).send('Invalid username or password');
    });
});

router.patch('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

module.exports = router;
