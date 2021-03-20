const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qna', { useNewUrlParser: true,  useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('database is running')
})

const questionsSchema = mongoose.Schema({
  question_id: Number,
  product_id: Number,
  body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_helpfulness: Number
});

const answersSchema = mongoose.Schema({
  answer_id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
});

const photosSchema = mongoose.Schema({
  _id: Number,
  answer_id: Number,
  url: String,
});

const Questions = mongoose.model('Questions', questionsSchema);
const Answers = mongoose.model('Answers', answersSchema);
const Photos = mongoose.model('Photos', photosSchema);

module.exports = {
  Questions,
  Answers,
  Photos
}
// module.exports = Answers;
// module.exports = questionsSchema;
