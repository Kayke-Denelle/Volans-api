const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ',
    required: true
  },
  reviewCounts: {
    type: Map,
    of: Number,
    default: {},
  },
  lastReviewed: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Deck', deckSchema);