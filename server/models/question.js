var mongoose = require('mongoose');

var Question = mongoose.model('Question', {
  text: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  },
  answers: [{
    text: {
      type: String,
      required: true,
      minlength: 1
    },
    correct: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = {
  Question
};
