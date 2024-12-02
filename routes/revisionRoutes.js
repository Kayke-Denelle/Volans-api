// routes/revisionRoutes.js
const express = require('express');
const Revision = require('../models/revision');
const mongoose = require('mongoose');
const router = express.Router();

// Endpoint para resumo semanal
router.get('/weekly-summary', async (req, res) => {
  try {
    const { userId } = req.query;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revisions = await Revision.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          date: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(revisions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resumo semanal.' });
  }
});

module.exports = router;
