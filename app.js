const express = require('express');
const logger = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
var path = require('path')
const app = express();
var router = express.Router()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var passport = require('passport');
var flash    = require('connect-flash');
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/uploads'))
var multer  = require('multer')

// app.use(multer.array());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log("testing cross origin")
    next();
}

app.use(allowCrossDomain);


require('./server/config/passport')(app,passport);

// Require our routes into the application.

require('./server/routes')(app);

require('./server/controllers/upload_files')(app);
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));


app.get('*', function(req, res){
	// res.sendFile(path.join(__dirname+ '/public/app/views/index.html'))
	res.send({message:'API Not Found'}).status(404)
})


// console.log('running on port ',port)
// server.listen(port);
const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

const server = http.createServer(app);
console.log('running on port ',port)
server.listen(port);
module.exports = app;
