const express = require('express');
const {ObjectID} = require('mongodb');
let mongoose = require('../connections/local');
const Todo = require('../models/todo');

let router = express.Router();

router.get('/', (req, res) => {
  Todo.find({}).then((results) => {
    res.send({results});
  }, (err) => {
    res.send(err);
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(404).send('Invalid Id Supplied');

  Todo.findById(req.params.id).then((result) => {
    res.send({result});
  }, (err) => {
    res.send(err);
  });
});

router.post('/', (req, res) => {
  let todo = new Todo(req.body)

  todo.save().then((result) => {
    res.send({result});
  }, (err) => {
    res.status(400).send(err);
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(404).send('Invalid Id Supplied');

  Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((result) => {
    res.send({result});
  }, (err) => {
    res.status(400).send(err);
  });

});



router.put('/')
// router.get('/:id', (req, res) => {
//   res.send(JSON.stringify(userService.getUser(req.params.id), null, 3));
// });


// router.delete('/', (req, res) => {
//   let success = userService.removeUser(req.body.username);
//
//   if (success) {
//     res.send(`User { ${req.body.username} } deleted.`);
//   } else {
//     res.status(500);
//     res.send('Error: user couldn\'t be deleted.');
//   }
// });

module.exports = router;
