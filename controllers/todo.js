const express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

let mongoose = process.env.MONGODB_URI !== undefined ? require('../connections/heroku') : require('../connections/local');

const Todo = require('../models/todo');

let router = express.Router();

router.get('/', (req, res) => {
  Todo.find({})
    .then((results) => {
      res.send({results});
    }, (err) => {
      res.status(404).send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(404).send('Invalid Id Supplied');

  Todo.findById(req.params.id)
    .then((result) => {
      if(result) {
        res.send({result});
      } else {
        res.status(404).send('Todo not found');
      }
    }, (err) => {
      res.send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  // TODO Decide if should still allow _id
  let validValues = _setCompletedAt(_.pick(req.body,  ['_id', 'title', 'description', 'completed']));
  let todo = new Todo(validValues);

  todo.save()
    .then((result) => {
      res.send({result});
    }, (err) => {
      res.status(400).send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

router.patch('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(404).send('Invalid Id Supplied');

  let validValues = _setCompletedAt(_.pick(req.body,  ['title', 'description', 'completed']));

  Todo.findByIdAndUpdate(req.params.id, validValues, {new: true})
    .then((result) => {
      if (result) {
        res.send({result});
      } else {
        res.status(404).send('Todo could not be updated');
      }
    }, (err) => {
      res.status(404).send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(404).send('Invalid Id Supplied');

  Todo.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        return res.status(400).send('Todo could not be deleted');
      }
    }, (err) => {
      res.status(404).send(err);
    })
    .catch((err) =>  {
      res.status(400).send(err);
    });
});

function _setCompletedAt(todo, isNew) {
  // TODO Refactor to do safer existing item completedAt value
  if (_.isBoolean(todo.completed) && todo.completed) {
    todo.completedAt = Date.now();
  } else if (!todo.completed) {
    todo.completedAt = null;
  }

  return todo;
}

module.exports = router;
