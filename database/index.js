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
  question_date: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_helpfulness: Number,
  answers: []
});

const answersSchema = mongoose.Schema({
  answer_id: Number,
  question_id: Number,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
  photos: []
});

const photosSchema = mongoose.Schema({
  photo_id: Number,
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
