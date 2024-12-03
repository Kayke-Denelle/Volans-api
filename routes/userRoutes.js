const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Modelo do usuário
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    console.log(`Email: ${email}, Password: ${password}`);
    // Verificar se a senha fornecida corresponde à armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expira em 1 hora
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/api/usuarios/:userId/revisoes', async (req, res) => {
  const { userId } = req.params;

  try {
    // Buscar todos os baralhos do usuário
    const decks = await Deck.find({ userId });

    // Consolidar as revisões de todos os baralhos
    const reviews = {};

    decks.forEach(deck => {
      deck.reviewCount.forEach((count, date) => {
        reviews[date] = (reviews[date] || 0) + count;
      });
    });

    // Transformar o objeto em array para facilitar a visualização
    const reviewArray = Object.entries(reviews).map(([date, count]) => ({
      date,
      count,
    }));

    res.json({ reviews: reviewArray });
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
});

module.exports = router;
