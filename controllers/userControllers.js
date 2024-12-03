const Deck = require('../models/deck');

const getUserReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const decks = await Deck.find({ userId });

    const reviews = {};

    decks.forEach(deck => {
      deck.reviewCount.forEach((count, date) => {
        reviews[date] = (reviews[date] || 0) + count;
      });
    });

    const reviewArray = Object.entries(reviews).map(([date, count]) => ({
      date,
      count,
    }));

    res.json({ reviews: reviewArray });
  } catch (error) {
    console.error('Erro ao buscar revisões:', error);
    res.status(500).json({ error: 'Erro ao buscar revisões.' });
  }
};

module.exports = { getUserReviews };
