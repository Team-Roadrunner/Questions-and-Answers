const fs = require('fs');
const path = require('path')
const mongoose = require('mongoose');
const {QuestionsTest} = require('./index.js');
const byline = require('byline');

var stream = fs.createReadStream('../data/answers.csv');
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
    const answerObj = {
      _id: Number(row[0]),
      question_id: Number(row[1]),
      body: row[2],
      date_written: row[3],
      answerer_name: row[4],
      answerer_email: row[5],
      reported: Number(row[6]),
      helpful: Number(row[7]),
    }

    bulk.find({ _id: Number(row[1]) } ).upsert().update( { $push: { answers: answerObj } } )

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
    console.log('kinda done')
    if ( counter % 1000 != 0 )
        bulk.execute(function(err,result) {
            if (err) throw err;   // or something
            console.log('DONE!')
        });
  });

});