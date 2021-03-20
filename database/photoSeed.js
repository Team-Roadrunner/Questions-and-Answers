const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {Questions} = require('./index.js');
const byline = require('byline');

var stream = fs.createReadStream('../data/answers_photos.csv');
stream = byline.createStream(stream);

mongoose.connection.on('open', function(err,conn) {

  console.log('RUNNING...')
  console.time('seed')
  var bulk = Questions.collection.initializeOrderedBulkOp();
  var counter = 0;

  stream.on("error", function(err) {
      console.log(err);
  });

  stream.on("data",function(line) {
    var row = line.toString('utf-8').split(",");
    const obj = {
      id: Number(row[0]),
      answer_id: Number(row[1]),
      url: row[2]
    }

    bulk.find({ answers: { $elemMatch: { answer_id: Number(row[1]) } } }).updateOne({ $addToSet: { "answers.$.photos": obj } })

    counter++;

    if (counter % 100000 === 0) {
      console.log(counter)
    }

    if (counter % 1000 === 0) {
      stream.pause()

      bulk.execute(function(err, result) {
        if (err) throw err
        bulk = Questions.collection.initializeOrderedBulkOp();

        stream.resume();
      })
    }
  });


  stream.on("end",function() {

    if ( counter % 1000 != 0 )
        bulk.execute(function(err,result) {
            if (err) throw err;
            console.log('DONE!')
            console.timeEnd('seed')
        });
  });
});