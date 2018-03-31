const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path')
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var passport = require('passport');
var flash    = require('connect-flash');
app.use(express.static(__dirname+'/public'))
// var session      = require('express-session');


require('./server/config/passport')(app,passport);

// Require our routes into the application.
require('./server/routes')(app);
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));


app.get('*', function(req, res){
	res.sendFile(path.join(__dirname+ '/public/app/views/index.html'))
})



module.exports = app;