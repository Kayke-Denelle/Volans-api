const express = require('express');
const Review = require('../models/review'); // Modelo de revisão
const router = express.Router();

// Incrementar revisões de um usuário
router.post('/', async (req, res) => {
    const { userId } = req.body;

    try {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
  
      const review = await Review.findOneAndUpdate(
        { userId },
        {
          $inc: { count: 1 },
          $push: {
            reviewsPerMonth: {
              month: currentMonth,
              year: currentYear,
              count: 1, // Incrementa 1 revisão para o mês/ano atual
            },
          },
        },
        { upsert: true, new: true }
      );
  
      res.json({ message: 'Revisão registrada com sucesso', review });
    } catch (error) {
      console.error('Erro ao registrar revisão:', error);
      res.status(500).json({ error: 'Erro ao registrar revisão.' });
    }
});

// Obter revisões de um usuário
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const review = await Review.findOne({ userId });
  
      if (!review) {
        return res.status(404).json({ message: 'Nenhuma revisão encontrada para este usuário.' });
      }
  
      // A resposta agora inclui as revisões por mês
      res.json({ reviewsPerMonth: review.reviewsPerMonth });
    } catch (error) {
      console.error('Erro ao buscar revisões:', error);
      res.status(500).json({ error: 'Erro ao buscar revisões.' });
    }
});

module.exports = router;
