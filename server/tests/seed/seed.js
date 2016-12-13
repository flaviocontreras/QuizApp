const { ObjectID } = require('mongodb');
const { Question } = require('./../../models/question');

const questions = [
  {
    _id: new ObjectID(),
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
