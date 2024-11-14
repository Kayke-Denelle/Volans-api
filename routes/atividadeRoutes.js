const express = require('express');
const Atividade = require('../models/atividade');
const router = express.Router();

// Rota para salvar a atividade
router.post('/', async (req, res) => {
  const { userId, cartaId, dificuldade } = req.body;

  try {
    const novaAtividade = new Atividade({ userId, cartaId, dificuldade });
    await novaAtividade.save();
    res.status(201).json(novaAtividade);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar a atividade', error });
  }
});

module.exports = router;