const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Outros campos existentes
  revisionDates: [Date], // Array para armazenar as datas de revisão
});

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;

