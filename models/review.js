const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  count: { type: Number, default: 0 }, // Contagem total de revisões
  reviewsPerMonth: [
    {
      month: String, // Ex: "January", "February", etc.
      year: Number,  // Ano da revisão
      count: { type: Number, default: 0 }, // Número de revisões naquele mês
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Data da última atualização
});

module.exports = mongoose.model('Review', ReviewSchema);
