var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var messages = require('./messages');
var scoreboards = require('./scoreboards');
var header = require('./views/partials/header');
var header2 = require('./views/partials/header2');
var thread = require('./views/partials/thread');

app.get('/', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: [scoreboards[0]],
		header: header,
		header2: header2,
		messages: messages
		});
});

app.use(express.static('public'));

app.get('/nfl', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: scoreboards,
		header: header,
		messages: messages
		});
});


app.get('/nba', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: scoreboards,
		header: header,
		messages: messages
		});
});

app.get('/mlb', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: scoreboards,
		header: header,
		messages: messages
		});
});

app.get('/mls', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: scoreboards,
		header: header,
		messages: messages
		});
});

app.get('/nhl', function(req, res, next) {
	res.status(200).render('homePage', {
		scoreboards: scoreboards,
		header: header,
		messages: messages
		});
});

app.get('*', function (req, res) {
  res.status(404).render('404', {
    	header: header
		});
});

app.listen(port, function() {
	console.log("== Server is listening on port", port);
});
