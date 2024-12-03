const express = require('express');
const Review = require('../models/review'); // Modelo de revisão
const router = express.Router();

// Incrementar revisões de um usuário
router.post('/api/revisoes', async (req, res) => {
  const { userId } = req.body;

  try {
    // Encontrar ou criar registro de revisão
    const review = await Review.findOneAndUpdate(
      { userId },
      { $inc: { count: 1 } }, // Incrementar a contagem
      { upsert: true, new: true } // Criar se não existir
    );

    res.json({ message: 'Revisão registrada com sucesso', review });
  } catch (error) {
    console.error('Erro ao registrar revisão:', error);
    res.status(500).json({ error: 'Erro ao registrar revisão.' });
  }
});

// Obter revisões de um usuário
router.get('/api/revisoes/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const review = await Review.findOne({ userId });

    if (!review) {
      return res.status(404).json({ message: 'Nenhuma revisão encontrada para este usuário.' });
    }

    res.json({ reviews: review.count });
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
