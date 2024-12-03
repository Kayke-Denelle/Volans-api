const express = require('express');
const { createDeck, getDecks, getDeckById } = require('../controllers/deckControllers');
const auth = require('../midleware/auth'); // Corrected the spelling of 'middleware'
const router = express.Router();


// Define your existing routes
router.post('/', auth, createDeck);
router.get('/', auth, getDecks);
router.get('/:deckId', auth, getDeckById);

// Update the review endpoint (this is where you place the updated code)
router.patch('/api/baralhos/:deckId/revisao', auth, async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await deck.findById(deckId);
    if (!deck) return res.status(404).json({ message: 'Baralho não encontrado.' });

    const today = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"
    deck.lastReviewed = new Date();

    // Increment the review count for today
    const reviewCount = deck.reviewCounts.get(today) || 0;
    deck.reviewCounts.set(today, reviewCount + 1);

    await deck.save();

    res.json({ message: 'Revisão salva com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a revisão.' });
  }
});

router.get('/api/baralhos/:deckId/revisoes', async (req, res) => {
    const { deckId } = req.params;
  
    try {
      const deck = await deck.findById(deckId);
      if (!deck) return res.status(404).json({ message: 'Baralho não encontrado.' });
  
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        return { date: formattedDate, count: deck.reviewCounts.get(formattedDate) || 0 };
      });
  
      res.json({ reviews: last7Days });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar revisões.' });
    }
  });

module.exports = router;