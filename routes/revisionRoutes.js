// routes/revisionRoutes.js (ou onde for o código da rota de revisão)
const express = require('express');
const Deck = require('../models/deck');
const router = express.Router();

// Salvar revisão no baralho (adicionando a data de revisão)
router.post('/revisions', async (req, res) => {
  const { userId, deckId, easyCount, mediumCount, hardCount } = req.body;

  try {
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Baralho não encontrado' });
    }

    // Adiciona a data da revisão no array `revisionDates`
    deck.revisionDates.push(new Date());
    await deck.save();

    res.status(201).json({ message: 'Revisão salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar revisão:', error);
    res.status(500).json({ error: 'Erro ao salvar revisão.' });
  }
});

// Obter revisões (somente as datas de revisão)
router.get('/revisions', async (req, res) => {
  const { userId } = req.query;

  try {
    const decks = await Deck.find({ 'userId': userId });
    if (!decks) {
      return res.status(404).json({ error: 'Baralhos não encontrados' });
    }

    // Retorna apenas as datas das revisões para cada baralho
    const revisionDates = decks.map(deck => deck.revisionDates);
    res.json(revisionDates);
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
