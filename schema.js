const mongoose = require('mongoose');

const URL = mongoose.model('url', {
  original_url: {
    type: String,
    trim: true,
    required: true,
  },
  short_url: {
    type: Number,
    required: true
  }
})

const Counter = mongoose.model('counter', {
  _id: {
    type: String,
    default: "counterId"
  },
  counter : {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = { URL, Counter }