const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qna', { useNewUrlParser: true });

const questionsSchema = mongoose.Schema({
  _id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_helpfulness: Number,
  helpful: Number,
});

const answersSchema = mongoose.Schema({
  _id: Number,
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

const QuestionsTest = mongoose.model('QuestionsTest', questionsSchema);
const AnswersTest = mongoose.model('AnswersTest', answersSchema);
const PhotosTest = mongoose.model('PhotosTest', photosSchema);

module.exports = {
  QuestionsTest,
  AnswersTest,
  PhotosTest
}
// module.exports = Answers;
// module.exports = questionsSchema;
