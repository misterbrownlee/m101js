var express = require('express'),
  consolidate = require('consolidate'),
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  app = express();

var mongoclient = new MongoClient(new Server('localhost', 27017), {'native_parser': true});

var db = mongoclient.db('course');

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(app.router);

app.get('/', function (request, response) {
  // response.send("Hello, World!");
  db.collection('hello_mongo_express').findOne({}, function (error, doc) {
    response.render('hello', doc);
  });
});

app.get('*', function (request, response) {
  response.send("Page Not Found", 404);
});

mongoclient.open(function (error, mongoclient) {
  if (error) throw error;
  app.listen(8080);
  console.log("started on 8080...");
});


