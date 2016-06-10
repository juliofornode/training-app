//dependencies
var express = require('express');
var logger = require('morgan');
var path = require('path');

//db settings and connection

//app instantiation
var app = express();


//app configuration: app.set()
var env = process.env.ENV || '3000';
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');


//middleware definition: app.use()
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));

//routes definition
app.get('*', function(req, res) {
    res.render('index');
});


//start app server with host and port
var port = 3000;
app.listen(port, function(){
    console.log('the server is listening on port ' + port);
});
