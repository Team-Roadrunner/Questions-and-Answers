const mongoose = require('mongoose');

mongoose.connect('mongodb://jordan:password@3.135.249.149:27017/qna', { useNewUrlParser: true,  useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('database is running')
})

const questionsSchema = mongoose.Schema({
  question_id: {
    type: Number,
    index: true,
    required:true
  },
  product_id: {
    type: Number,
    index: true,
    required:true
  },
  body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_helpfulness: Number,
  answers: []
});

const answersSchema = mongoose.Schema({
  answer_id: {
    type: Number,
    index: true,
    required:true
  },
  question_id: {
    type: Number,
    index: true,
    required:true
  },
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

const Questions = mongoose.model('QuestionsandAnswers', questionsSchema);
const Answers = mongoose.model('Answers', answersSchema);
const Photos = mongoose.model('Photos', photosSchema);

module.exports = {
  Questions,
  Answers,
  Photos
}
// module.exports = Answers;
// module.exports = questionsSchema;
