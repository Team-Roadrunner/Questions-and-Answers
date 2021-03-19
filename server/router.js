const router = require('express').Router();
const controller = require('./controller.js');

// Get or post question by product ID
router
  .route('/qa/questions/:product_id')
  .get(controller.getQuestions)
  .post(controller.postQuestion)

// Get or post answer by question ID
router
  .route('/qa/questions/:question_id/answers')
  .get(controller.getAnswers)
  .post(controller.postAnswer)

// Upvote answer helpfulness score by answer ID
router
  .route('/qa/answers/:answer_id/helpful')
  .put(controller.voteAnswerHelpful)

// Update question helpfulness score by question ID
router
  .route('/qa/questions/:question_id/helpful')
  .put(controller.voteQuestionHelpful)

// Report a question by question ID
router
  .route('/qa/questions/:question_id/report')
  .put(controller.reportQuestion)

// Report an answer by answer ID
router
  .route('/qa/answers/:answer_id/report')
  .put(controller.reportAnswer)

module.exports = router;
