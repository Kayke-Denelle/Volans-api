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

    // Verifica se o baralho contém cartas
    const cards = await Card.find({ deckId }); // Supondo que 'Card' seja o modelo de cartas e o 'deckId' seja a referência

    if (cards.length > 0) {
      // Caso o baralho tenha cartas, retornar uma mensagem de alerta
      return res.status(400).json({ message: 'Este baralho contém cartas. Deseja excluir as cartas também?' });
    }

    // Deleta o baralho se não tiver cartas
    await Deck.findByIdAndDelete(deckId);

    res.status(200).json({ message: 'Deck excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Endpoint para verificar se o baralho contém cartas
const verifyCardsInDeck = async (req, res) => {
  const { deckId } = req.params;  // Captura o deckId da URL

  try {
    // Verifica se o baralho contém cartas
    const cards = await Card.find({ deckId });

    if (cards.length > 0) {
      return res.status(200).json({ message: 'Este baralho contém cartas. Deseja excluir as cartas também?' });
    }

    res.status(200).json({ message: 'Este baralho não contém cartas.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  createDeck,
  getDecks,
  getDeckById,
  updateDeck,  // Exportando a função de atualização
  deleteDeck,
  verifyCardsInDeck  // Exportando a função de exclusão
};
