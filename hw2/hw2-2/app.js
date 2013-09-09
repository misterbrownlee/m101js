var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('data').find({});

    cursor.sort({"State":1, "Temperature" :-1});

    var lastState = "";
    var lastTemp = -9999;

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        // if (!lastState) {
        // }

          // console.log("s/t ", lastState, lastTemp );

        if (lastState != doc["State"] ) {
          lastState = doc["State"];
          lastTemp = doc["Temperature"];
          console.log("state high: ", lastState, lastTemp );
          console.log("will update", doc['_id']);

          var updateQuery = { '_id' : doc['_id'] };
          var operator = { '$set' : { 'month_high' : true } };

          db.collection('data').update(updateQuery, operator, function(err, updated) {
              if(err) throw err;

              console.dir("Successfully updated " + updated + " document!");

              return db.close();
          });

        }



        // console.dir(doc["State"] + "/" +doc["Temperature"]);
    });

    // var query = { 'grade' : 100 };

    // var cursor = db.collection('grades').find(query);

    // cursor.each(function(err, doc) {
    //     if(err) throw err;

    //     if(doc == null) {
    //         return db.close();
    //     }

    //     console.dir(doc.student + " got a good grade!");
    // });

    // var query = { 'assignment' : 'hw1' };
    // var operator = { '$set' : { 'date_returned' : new Date() } };

    // db.collection('grades').update(query, operator, function(err, updated) {
    //     if(err) throw err;

    //     console.dir("Successfully updated " + updated + " document!");

    //     return db.close();
    // });
});
