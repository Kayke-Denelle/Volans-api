const express = require('express');
const Revision = require('../models/revision');
const router = express.Router();

// Salvar revisão
router.post('/revisions', async (req, res) => {
  try {
    const { userId, deckId, easyCount, mediumCount, hardCount } = req.body;
    const revision = new Revision({ userId, deckId, easyCount, mediumCount, hardCount });
    await revision.save();
    res.status(201).json({ message: 'Revisão salva com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar revisão.' });
  }
});

// Obter revisões
router.get('/revisions', async (req, res) => {
  try {
    const { userId } = req.query;
    const revisions = await Revision.find({ userId }).sort({ date: 1 });
    res.json(revisions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
