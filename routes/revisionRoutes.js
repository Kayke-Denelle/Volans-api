const express = require('express');
const Revision = require('../models/revision');
const authMiddleware = require('../midleware/auth');
const router = express.Router();

// Salvar revisão
router.post('/revisions', authMiddleware, async (req, res) => {
  try {
    const { deckId, easyCount, mediumCount, hardCount } = req.body;

    // `userId` já está disponível no req.userId graças ao middleware
    const revision = new Revision({
      userId: req.userId,
      deckId,
      easyCount,
      mediumCount,
      hardCount,
    });

    await revision.save();
    res.status(201).json({ message: 'Revisão salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar revisão:', error);
    res.status(500).json({ error: 'Erro ao salvar revisão.' });
  }
});

// Obter revisões
router.get('/revisions', authMiddleware, async (req, res) => {
  try {
    // Busca revisões com base no userId do token
    const revisions = await Revision.find({ userId: req.userId }).sort({ date: 1 });
    res.json(revisions);
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
