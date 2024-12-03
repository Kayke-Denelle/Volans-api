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
    // Buscar revisões feitas no banco, agrupando por mês e ano
    const reviews = await Review.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
      { $group: { _id: { month: "$month", year: "$year" }, count: { $sum: 1 } } },
      { $sort: { "_id.year": -1, "_id.month": -1 } }, // Ordena para o gráfico exibir do mais recente para o mais antigo
    ]);

    // Formatar para um formato mais amigável
    const reviewsPerMonth = reviews.map(review => ({
      month: review._id.month,
      year: review._id.year,
      count: review.count
    }));

    res.json({ reviewsPerMonth });
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
