Homework 4.4

In this problem you will analyze a profile log taken from a mongoDB instance. You should have included with your homework files a 'sysprofile.json' file. Import this file with the following command:

    mongoimport -d m101 -c profile < sysprofile.json

Now query the profile data, looking for all queries to the students collection in the database school2, sorted in order of decreasing latency.

What is the latency of the longest running operation to the collection, in milliseconds?

- 4715
- 34430
- 5018
- 15820 <
- 3217

```
> db.profile.find({ns:/^school2.students/}).sort({millis:-1}).limit(4).pretty()
{
  "_id" : ObjectId("522e5d3cf2b8566d78b65491"),
  "ts" : ISODate("2012-11-20T20:09:49.862Z"),
  "op" : "query",
  "ns" : "school2.students",
  "query" : {
    "student_id" : 80
  },
  "ntoreturn" : 0,
  "ntoskip" : 0,
  "nscanned" : 10000000,
  "keyUpdates" : 0,
  "numYield" : 5,
  "lockStats" : {
    "timeLockedMicros" : {
      "r" : 19776550,
      "w" : 0
    },
    "timeAcquiringMicros" : {
      "r" : 4134067,
      "w" : 5
    }
  },
  "nreturned" : 10,
  "responseLength" : 2350,
  "millis" : 15820,
  "client" : "127.0.0.1",
  "user" : ""
}
```