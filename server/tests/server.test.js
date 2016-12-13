const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Question } = require('../models/question');
const { questions, populateQuestions } = require('./seed/seed');

beforeEach(populateQuestions);

describe('POST /questions', () => {
  it('should create a new question', (done) => {
    var question = {
      text: 'What is my name?',
      answers: [{
          text: 'Flavio',
          correct: true
        }, {
          text: 'John'
        }
      ]
    };

    request(app)
      .post('/questions')
      .send(question)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(question.text);
        expect(res.body.answers.length).toBe(2);
        expect(res.body.answers[0]).toInclude({
          text: 'Flavio',
          correct: true
        });
      })
      .end((err, res) => {
          if (err) {
            return done(err);
          }

          Question.find({ "text": question.text }).then((questions) => {
            expect(questions.length).toBe(1);
            expect(questions[0].text).toBe(question.text);
            expect(questions[0].answers.length).toBe(2);
            expect(questions[0].answers[0]).toInclude({
              text: 'Flavio',
              correct: true
            });
            done();
          }).catch((e) => done(e));
      });
  });

  it('should not create question with invalid body data', (done) => {
    request(app)
      .post('/questions')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find().then((questions) => {
          expect(questions.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /questions', () => {
  it('should get all questions', (done) => {
    request(app)
      .get('/questions')
      .expect(200)
      .expect((res) => {
        expect(res.body.questions.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /questions/:id', () => {
  it('should return question doc', (done) => {
    request(app)
      .get(`/questions/${questions[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.question.text).toBe(questions[0].text);
        expect(res.body.question.answers[0]).toInclude(questions[0].answers[0]);
      })
      .end(done);
  });

  it('should return 404 if question not found', (done) => {
    let id = new ObjectID();
    request(app)
      .get(`/questions/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/questions/123')
      .expect(404)
      .end(done);
  });
});
