const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }, // Dificuldade
  lastReviewed: { type: Date }, // Data da última revisão
});

module.exports = mongoose.model('Card', cardSchema);
