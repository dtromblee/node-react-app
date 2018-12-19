const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
let mongoose = require('mongoose');
const todoRouter = require('./controllers/todo');
const userRouter = require('./controllers/user');

// Express config
let app = express();
let port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // Enable JSON body support
app.use('/users', userRouter);
app.use('/todos', todoRouter)
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = app;
