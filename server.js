const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const userRouter = require('./routers/user-router');

let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // Enable JSON body support
app.use('/users', userRouter);

app.get('/adminInfo', (req, res) => {
  res.status(403);
  res.send('Uh uh uh! Didn\'t say the magic word!');
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
