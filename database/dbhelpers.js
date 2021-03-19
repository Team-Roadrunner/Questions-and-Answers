const { QuestionsTest } =  require('./')

const helpers = {
  getQuestions: (req, callback) => {
    QuestionsTest.find({
      product_id: req.params.product_id
    })
    .then((results) => callback(null, results))
    .catch((err) => console.log(err))
  },
  postQuestion: (req, callback) => {
    console.log(req.body)
    QuestionsTest.create({
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id
    })
    .then(() => console.log('Posted!'))
    .catch((err) => console.log(err))
  },
  getAnswers: (req, callback) => {
    QuestionsTest.find({
      question_id: req.params.question_id
    })
    .then((results) => callback(null, results))
    .catch((err) => console.log(err))
  },
};

module.exports = helpers;
