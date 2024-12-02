const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model de usuário, se necessário.

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Substitua pelo seu segredo JWT
    req.userId = decoded.id; // Assume que o ID do usuário está no payload do token
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
