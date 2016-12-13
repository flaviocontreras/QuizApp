require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Question } = require('./models/question');
// Create our app
var app = express();
// Busca a porta do Heroku
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');


app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.json());


app.post('/questions', (req, res) => {

  var question = new Question({
    text: req.body.text,
    answers: req.body.answers
  });

  question.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/questions', (req, res) => {
  Question.find().then((questions) => {
    res.send({ questions });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/questions/:id', (req, res) => {
  var { id } = req.params;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  } else {
    Question.findById(id).then((question) => {
      if (!question) {
        return res.status(404).send();
      }
      return res.send({ question });
    }, (e) => {
      return res.status(400).send();
    });
  }
});

app.delete('/questions/:id', (req, res) => {
  var { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  } else {
    Question.findOneAndRemove({
      _id: id
    }).then((question) => {
      if (!question) {
        return res.status(404).send();
      }
      return res.send({ question });
    }, (e) => {
      return res.status(404).send();
    });
  }
});

app.patch('/questions/:id', (req, res) => {
  var { id } = req.params;
  var { text, answers } = req.body;
  var body = { text, answers };

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  } else {

    Question.findOneAndUpdate({
      _id: id
    }, { $set: body }, { new: true }).then((question) => {
      if (!question) {
        return res.status(404).send();
      }

      return res.send({ question });
    }).catch((e) => {
      return res.status(404).send();
    });
  }
});

// Makes sure to send the bundle.js even when the with multiple routes
app.get('*/bundle.js', function (request, response){
  response.sendFile(path.resolve(PUBLIC_PATH, 'bundle.js'))
});
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// Usar somente com browserHistory, desabilitar no caso de hashHistory
app.get('*', function (request, response){
  response.sendFile(path.resolve(PUBLIC_PATH, 'index.html'))
});

app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT);
});

module.exports = {
  app
};
