const express = require('express');
const { createDeck, getDecks, getDeckById, updateDeck, deleteDeck, verifyCardsInDeck } = require('../controllers/deckControllers');
const auth = require('../midleware/auth'); // Corrected the spelling of 'middleware'
const router = express.Router();


// Define your existing routes
router.post('/', auth, createDeck);
router.get('/', auth, getDecks);
router.get('/:deckId', auth, getDeckById);
router.put('/:deckId', auth, updateDeck);
router.delete('/:deckId', auth, deleteDeck); 
router.get('/:deckId/verificar-cartas', auth, verifyCardsInDeck); 

module.exports = router;