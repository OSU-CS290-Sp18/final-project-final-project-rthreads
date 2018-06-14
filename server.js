var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require ('body-parser');
var app = express();

var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = "27017";
var mongoUsername = "cs290_ramosjos";
var mongoPassword = "cs290_ramosjos";
var mongoDBName = "cs290_ramosjos";

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;

var port = process.env.PORT || 27017;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());

var messages = require('./messages');
var scoreboards = require('./scoreboards');
var header = require('./views/partials/header');
var header2 = require('./views/partials/header2');
var thread = require('./views/partials/thread');

app.get('/', function(req, res, next) {
    var games = mongoDB.collection('nbaGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, nbaGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: nbaGames[0],
                header: header,
                header2: header2,
                messages: messages
            });
        }
    });
});

app.get('/nfl', function (req, res, next) {
    var games = mongoDB.collection('nflGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, nflGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: nflGames,
                header: header,
                messages: messages
            });
        }
    });
});

app.get('/nba', function (req, res, next) {
    var games = mongoDB.collection('nbaGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, nbaGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: nbaGames,
                header: header,
                messages: messages
            });
        }
    });
});

app.get('/mlb', function (req, res, next) {
    var games = mongoDB.collection('mlbGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, mlbGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: mlbGames,
                header: header,
                messages: messages
            });
        }
    });
});

app.get('/mls', function (req, res, next) {
    var games = mongoDB.collection('mlsGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, mlsGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: mlsGames,
                header: header,
                messages: messages
            });
        }
    });
});

app.get('/nhl', function (req, res, next) {
    var games = mongoDB.collection('nhlGames');
    var messages = mongoDB.collection('messages');
    games.find().toArray(function (err, nhlGames) {
        if (err) {
            res.status(500).send("Error fetching games from DB");
        }

        else {
            res.status(200).render('homePage', {
                scoreboards: nhlGames,
                header: header,
                messages: messages
            });
        }
    });
});
/*
app.post('/', function (req, res, next) {
    var message = req.params.person.toLowerCase();
    if (req.body && req.body.caption && req.body.photoURL) {
        var photo = {
            caption: req.body.caption,
            photoURL: req.body.photoURL
        };
        var peopleCollection = mongoDB.collection('people');
        peopleCollection.updateOne(
            { personId: person },
            { $push: { photos: photo } },
            function (err, result) {
                if (err) {
                    res.status(500).send("Error inserting photo into DB.")
                } else {
                    console.log("== mongo insert result:", result);
                    if (result.matchedCount > 0) {
                        res.status(200).end();
                    } else {
                        next();
                    }
                }
            }
        );
    } else {
        res.status(400).send("Request needs a JSON body with caption and photoURL.")
    }
});
*/

MongoClient.connect(mongoURL, function (err, client) {
    if (err) {
        throw err;
    }
    mongoDB = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("== Server listening on port", port);
    });
})
