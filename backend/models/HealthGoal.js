const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  progress: { type: Number, default: 0 },
  target: { type: Number, required: true },
  isComplete: { type: Boolean, default: false }
});

module.exports = mongoose.model('HealthGoal', goalSchema);