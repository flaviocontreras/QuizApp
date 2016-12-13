const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Question } = require('../models/question');

beforeEach((done) => {
  Question.remove({}).then(() => done());
});

describe('POST /question', () => {
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
      .post('/question')
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
      .post('/question')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find().then((questions) => {
          expect(questions.length).toBe(0);
          done();
        }).catch((e) => done(e));        
      });
  });
});
