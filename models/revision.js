// models/revision.js
const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  cardId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Card' },
  deckId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Deck' },
  date: { type: Date, default: Date.now }, // Data da revisão
});

module.exports = mongoose.model('Revision', revisionSchema);
