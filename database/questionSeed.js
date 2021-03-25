const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {Questions} = require('./index.js');
const byline = require('byline');

var cleanString = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    // only add first and last char if it's an alphabet character
    if (i === 0 || i === str.length - 1) {
      // https://coderrocketfuel.com/article/how-to-check-if-a-character-is-a-letter-using-javascript
      if ((/[a-zA-Z]/).test(str[i])) {
        result += str[i]
      }
    } else {
      // other than that use the whole string
      result += str[i]
    }
  }
  return result
}

var stream = fs.createReadStream('./data/questions.csv');
stream = byline.createStream(stream);

mongoose.connection.on('open', function(err,conn) {

  console.log('RUNNING...')
  console.time('questions_seed')
  var bulk = Questions.collection.initializeOrderedBulkOp();
  var counter = 0;

  stream.on("error", function(err) {
      console.log(err);
  });

  stream.on("data",function(line) {
    var row = line.toString('utf-8').split(",");
    const obj = {
      question_id: Number(row[0]),
      product_id: Number(row[1]),
      question_body: cleanString(row[2]),
      question_date: cleanString(row[3]),
      asker_name: cleanString(row[4]),
      asker_email: cleanString(row[5]),
      reported: Number(row[6]),
      question_helpfulness: Number(row[7]),
      answers: []
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
            console.timeEnd('questions_seed')
        });
  });
});