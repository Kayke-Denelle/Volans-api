const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastReviewed: {
    type: Date,
    default: null,
  },
  reviewCount: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;