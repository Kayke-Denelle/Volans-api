const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastReviewed: Date, // Última data de revisão
  reviewCount: { type: Map, of: Number, default: {} }, // Contagem de revisões por dia (ex: "2024-12-01": 5)
});

module.exports = mongoose.model('Deck', deckSchema);
