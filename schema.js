const mongoose = require('mongoose');

const url = mongoose.model('url', {
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