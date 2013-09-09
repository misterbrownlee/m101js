var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('students').find({});

    // cursor.sort({"scores.score": -1});

        cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }
        // console.log("doc ", doc);
        console.log("student ", doc._id, doc.name);
        var index = 0;
        var lowestIndex = -1;

        doc.scores.forEach(function(entry) {
          if (entry.type === 'homework') {
            if (lowestIndex == -1) {
              lowestIndex = index;
            } else if (entry.score <= doc.scores[lowestIndex].score) {
              // console.log("  setting index to", index);
              lowestIndex = index;
            } else {
              // console.log("skip"); 
            } 
          } 
          index++;
        });
        console.log("dropping lowest", lowestIndex, doc.scores[lowestIndex].score);
        doc.scores.splice(lowestIndex, 1);
        // console.log("scores", doc.scores);

        db.collection('students').update({_id: doc._id}, { $set: {scores: doc.scores}}, function(err, result) {
            if (err) throw err;
            // console.log("updated ", result._id);  
        });            
        console.log("-----------");  

      });



});