const express = require('express');
const User = require('../models/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
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
      console.error(err);
      res.status(400).send(err);
    })
    .then((token) => {
      res.header('x-auth', token).send({user});
    }, (err) => {
      res.status(400).send(err);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

router.patch('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

module.exports = router;
