const mongoose = require('mongoose');

const vectorSchema = new mongoose.Schema({
  vector: {
    type: [Number],
    required: true
  }
});

module.exports = mongoose.model('Vector', vectorSchema);