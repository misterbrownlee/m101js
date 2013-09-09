var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(error, db) {
  if (error) throw error;

  db.collection('coll').findOne({}, function(error, doc){

    if (error) throw error;

    console.dir(doc);

    db.close();

  });

  console.dir("Called findone!");

});