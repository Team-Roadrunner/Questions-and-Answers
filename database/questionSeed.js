const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {QuestionsTest} = require('./index.js');
const byline = require('byline');

var stream = fs.createReadStream('../data/questions.csv');
stream = byline.createStream(stream);

mongoose.connection.on('open', function(err,conn) {

  console.log('RUNNING...')
  console.time('seed')
  var bulk = QuestionsTest.collection.initializeOrderedBulkOp();
  var counter = 0;

  stream.on("error", function(err) {
      console.log(err);
  });

  stream.on("data",function(line) {
    var row = line.toString('utf-8').split(",");
    const obj = {
      _id: Number(row[0]),
      product_id: Number(row[1]),
      body: row[2],
      date_written: row[3],
      asker_name: row[4],
      asker_email: row[5],
      reported: Number(row[6]),
      helpful: Number(row[7]),
    }

    bulk.insert(obj);

    counter++;

    if (counter % 100000 === 0) {
      console.log(counter)
    }

    if (counter % 1000 === 0) {
      stream.pause()

      bulk.execute(function(err, result) {
        if (err) throw err
        bulk = QuestionsTest.collection.initializeOrderedBulkOp();

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