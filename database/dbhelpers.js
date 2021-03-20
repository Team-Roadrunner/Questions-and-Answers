const { Questions } =  require('./');

const helpers = {
  getQuestions: (req, callback) => {
    Questions.find({
      product_id: req.params.product_id
    })
    .then((results) => callback(null, results))
  },
  postQuestion: (req, callback) => {
    console.log(req.body)
    Questions.create({
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id
    })
  },
  getAnswers: (req, callback) => {
    Questions.find({
      question_id: req.params.question_id
    })
    .then((results) => callback(null, results))
  },
  postAnswer: (req, callback) => {
    Questions.create({
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id
    })
  },
  voteAnswerHelpful: (req, callback) => {
    let id = Number(req.params.answer_id)
    // Questions.find({
    //   answers: {$elemMatch: {answer_id: 5}}
    // })
    // .then((results) => {
    //   // console.log('RESULTS', results)
    //   let obj = results[0].toJSON();
    //   obj.answers.forEach((answer => {
    //     if (answer.answer_id === 5) {
    //       answer.helpfulness = answer.helpfulness + 1
    //     }
    //   }))
    //   // console.log(obj._id)
    //   Questions.findOneAndUpdate(
    //     {answers: {$elemMatch: {answer_id: 5}}},
    //     {$set: {answers: obj.answers}}
    //     )
    // })
    Questions.updateOne(
      {answers: {$elemMatch: {answer_id: 1}}},
      {$set: {helpfulness: 20}}, (err, data) => {
      if (err) callback(err)
      else callback(null, data)
    })
  },
  voteQuestionHelpful: (req, callback) => {
    Questions.findOneAndUpdate({
      question_id: Number(req.params.question_id)
    }, {$inc: {question_helpfulness: 1}}, {new:true}, (err, data) => {
      if (err) callback(err)
      else callback(null, data)
    })
  },
  reportQuestion: (req, callback) => {
    Questions.findOneAndUpdate({
      question_id: Number(req.params.question_id)
    }, {$inc: {reported: 1}}, {new:true}, (err, data) => {
        if (err) callback(err)
        else callback(null, data)
      }
    )
  },
  reportAnswer: (req, callback) => {
    let id = Number(req.params.answer_id)
    Questions.findOneAndUpdate(
      {answers: {$elemMatch: {answer_id: id}}},
      {$set: {"answers.$.reported": 1}}, {new:true}, (err, data) => {
        if (err) callback(err)
        else callback(null, data)
      }
    )
  }
};

module.exports = helpers;

