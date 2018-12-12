var mongoose = require('mongoose');

let herokuConn = 'mongodb://heroku_l65sf4bn:d245k4q3m4ne6516097nvgsrbi@ds131814.mlab.com:31814/heroku_l65sf4bn';

mongoose.Promise = global.Promise;
mongoose.connect(herokuConn);

module.exports = mongoose;
