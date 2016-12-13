
var { Question } = require('./../../models/question');

const questions = [
  {
    text: 'What is my age?',
    answers: [{
        text: '24',
        correct: true
      }, {
        text: '20'
      }
    ]
  }
];

const populateQuestions = (done) => {
  Question.remove({}).then(() => {
    return Question.insertMany(questions);
  }).then(() => done());
};

module.exports = {
  questions,
  populateQuestions
};
