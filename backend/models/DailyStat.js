const mongoose = require('mongoose');

const dailyStatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true },
  timePlayed: Number,
  breaksTaken: Number,
  goalsCompleted: Number
});

module.exports = mongoose.model('DailyStat', dailyStatSchema);