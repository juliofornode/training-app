//dependencies
var express = require('express');
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var stylus = require('express-stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//db settings and connection

//mongoose.connect('mongodb://localhost/training-app');
mongoose.connect('mongodb://julio:facil@ds011664.mlab.com:11664/training-app');

var db = mongoose.connection;

db.once('open', function() {
    console.log('The training-app database is open now.');
});

db.on('error', function() {
    console.log('Error trying to open the db.');
});

var Course = require('./server/models/courses.js');


//app instantiation
var app = express();


//app configuration: app.set()
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
var port = app.get('port');


//middleware definition: app.use()
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(favicon(path.join(__dirname, '/client/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(stylus({
    src: __dirname + '/client'
}));


//routes definition
app.get('/partials/:partialPath', function(req, res) {
    res.render(__dirname + '/client/partials/' + req.params.partialPath);
});

app.get('/', function(req, res) {
    Course.find(function (error, result) {
        if (error) return next(error);
        console.log(result[0].title);
        res.render('index', {tamare: 'tu madre', courses: result});
    });
});

app.get('*', function(req, res) {
    res.send('404 page not found');
});


//start app server with host and port
app.listen(port, function(){
    console.log('the server is listening on port ' + port);
});
