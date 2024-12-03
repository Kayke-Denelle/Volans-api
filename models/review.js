const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  count: { type: Number, default: 0 }, // Total de revisões feitas
  createdAt: { type: Date, default: Date.now }, // Data da última atualização
});

module.exports = mongoose.model('Review', ReviewSchema);
