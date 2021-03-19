const helpers = require('../database/dbhelpers.js');

const controller = {
  getQuestions: (req, res) => {
    helpers.getQuestions(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  postQuestion: (req, res) => {
    helpers.postQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  },
  getAnswers: (req, res) => {
    helpers.getAnswers(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  postAnswer: (req, res) => {
    helpers.postAnswer(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  },
  voteAnswerHelpful: (req, res) => {
    helpers.voteAnswerHelpful(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    })
  },
  voteQuestionHelpful: (req, res) => {
    helpers.voteQuestionHelpful(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    })
  },
  reportQuestion: (req, res) => {
    helpers.reportQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    })
  },
  reportAnswer: (req, res) => {
    helpers.reportAnswer(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    })
  }
};

module.exports = controller;