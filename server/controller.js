const helpers = require('../database/dbhelpers.js');

const controller = {
  getQuestions: (req, res) => {
    helpers.getQuestions(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send({
          product_id: data[0].product_id,
          results: data
        });
      }
    })
  },
  postQuestion: (req, res) => {
    helpers.postQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Posted!');
      }
    })
  },
  getAnswers: (req, res) => {
    helpers.getAnswers(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        data = data[0].toJSON()
        res.status(200).send({
          question: data.question_id,
          page: 0,
          count: 5,
          results: data.answers
        });
      }
    })
  },
  postAnswer: (req, res) => {
    helpers.postAnswer(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Posted!');
      }
    })
  },
  voteAnswerHelpful: (req, res) => {
    helpers.voteAnswerHelpful(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(data);
      }
    })
  },
  voteQuestionHelpful: (req, res) => {
    helpers.voteQuestionHelpful(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(data);
      }
    })
  },
  reportQuestion: (req, res) => {
    helpers.reportQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json('Reported!');
      }
    })
  },
  reportAnswer: (req, res) => {
    helpers.reportAnswer(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json('Reported!');
      }
    })
  }
};

module.exports = controller;