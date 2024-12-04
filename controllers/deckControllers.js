// controllers/deckControllers.js
const Deck = require('../models/deck');  // Certifique-se de que você tem um modelo "Deck"

// Função para criar um novo baralho
const createDeck = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;  // O userId vem do middleware auth

  try {
    const newDeck = new Deck({
      name,
      description,
      userId,
    });

    await newDeck.save();
    res.status(201).json(newDeck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para pegar todos os baralhos do usuário
const getDecks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const decks = await Deck.find({ userId });
    res.status(200).json(decks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para pegar um baralho por ID
const getDeckById = async (req, res) => {
  const { deckId } = req.params;  // Captura o deckId da URL

  try {
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: 'Deck não encontrado' });
    }

    res.status(200).json(deck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para editar um baralho
const updateDeck = async (req, res) => {
  const { deckId } = req.params;  // Captura o deckId da URL
  const { name, description } = req.body;
  const userId = req.user.userId;  // O userId vem do middleware auth

  try {
    // Busca o baralho pelo ID
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: 'Deck não encontrado' });
    }

    // Verifica se o baralho pertence ao usuário
    if (deck.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este baralho' });
    }

    // Atualiza os dados do baralho
    deck.name = name || deck.name;
    deck.description = description || deck.description;

    await deck.save();

    res.status(200).json(deck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para deletar um baralho
const deleteDeck = async (req, res) => {
  const { deckId } = req.params;  // Captura o deckId da URL
  const userId = req.user.userId;  // O userId vem do middleware auth

  try {
    // Busca o baralho pelo ID
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: 'Deck não encontrado' });
    }

    // Verifica se o baralho pertence ao usuário
    if (deck.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este baralho' });
    }

    // Deleta o baralho
    await deck.remove();

    res.status(200).json({ message: 'Deck excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDeck,
  getDecks,
  getDeckById,
  updateDeck,  // Exportando a função de atualização
  deleteDeck,  // Exportando a função de exclusão
};
