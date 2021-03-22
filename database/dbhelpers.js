const { Questions, Answers, Photos } =  require('./');

function getNumber(callback){
  var n = Math.floor(Math.random()*1000000000);
  Questions.findOne({'question_id': n}, function(err, result){
      if (err) callback(err);
      else if (result) return getNumber(callback);
      else callback(null, n);
  });
}
// const test = getNumber(function(error, number){
//   console.log(number)
// });

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  return [year, month, day].join('-');
}


const helpers = {
  getQuestions: (req, callback) => {
    Questions.find({
      product_id: req.params.product_id
    })
    .then((results) => callback(null, results))
  },
  postQuestion: (req, callback) => {
    // console.log(req.body)
    Questions.create({
      question_id: Math.floor(Math.random()*1000000000),
      product_id: req.body.product_id,
      body: req.body.body,
      question_date: formatDate(new Date()),
      asker_name: req.body.name,
      asker_email: req.body.email,
      reported: 0,
      question_helpfulness: 0
    })
    .then((results) => {
      callback(null, results)
    })
  },
  getAnswers: (req, callback) => {
    Questions.find({
      question_id: req.params.question_id
    })
    .then((results) => callback(null, results))
  },
  postAnswer: (req, callback) => {
    let photos = [];
    let a_id = Math.floor(Math.random()*1000000000)
    let q_id = Number(req.params.question_id)
    if (req.body.photos) {
      req.body.photos.forEach((photo_url) => {
        let newPhotos = new Photos({
          photo_id: Math.floor(Math.random()*1000000000),
          answer_id: a_id,
          url: photo_url
        })
        photos.push(newPhotos)
      })
    }
    let newAnswer = new Answers({
      answer_id: a_id,
      question_id: q_id,
      body: req.body.body,
      date_written: formatDate(new Date()),
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      reported: 0,
      helpful: 0,
      photos: photos
    })
    Questions.update(
      {question_id: q_id},
      {$push: {answers: newAnswer}},
      (err, data) => {
        if (err) callback(err)
        else callback(null, data)
      }
    )
  },
  voteAnswerHelpful: (req, callback) => {
    let id = Number(req.params.answer_id)
    Questions.findOneAndUpdate(
      {answers: {$elemMatch: {answer_id: id}}},
      {$inc: {"answers.$.helpfulness": 1}}, (err, data) => {
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
    }, {$set: {reported: 1}}, {new:true}, (err, data) => {
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

