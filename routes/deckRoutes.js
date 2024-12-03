const express = require('express');
const { createDeck, getDecks, getDeckById } = require('../controllers/deckControllers');
const auth = require('../midleware/auth'); // Corrected the spelling of 'middleware'
const router = express.Router();


// Define your existing routes
router.post('/', auth, createDeck);
router.get('/', auth, getDecks);
router.get('/:deckId', auth, getDeckById);

module.exports = router;