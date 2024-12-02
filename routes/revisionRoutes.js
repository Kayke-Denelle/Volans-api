const express = require('express');
const Deck = require('../models/deck');
const router = express.Router();

// Atualizar revisão no baralho
router.patch('/api/baralhos/:deckId/revisao', async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(404).json({ message: 'Baralho não encontrado.' });

    // Atualiza a última data de revisão
    const today = new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    deck.lastReviewed = new Date();

    // Incrementa a contagem de revisões para o dia atual
    const reviewCount = deck.reviewCount.get(today) || 0;
    deck.reviewCount.set(today, reviewCount + 1);

    await deck.save();

    res.json({ message: 'Revisão salva com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a revisão.' });
  }
});

router.get('/api/baralhos/:deckId/revisoes', async (req, res) => {
    const { deckId } = req.params;
  
    try {
      const deck = await Deck.findById(deckId);
      if (!deck) return res.status(404).json({ message: 'Baralho não encontrado.' });
  
      // Retorna a contagem de revisões dos últimos 7 dias
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        return { date: formattedDate, count: deck.reviewCount.get(formattedDate) || 0 };
      });
  
      res.json({ reviews: last7Days });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar revisões.' });
    }
  });
  

module.exports = router;
