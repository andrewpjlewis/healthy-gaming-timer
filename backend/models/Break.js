const mongoose = require('mongoose');

const breakSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  session:  { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  start:    { type: Date, required: true },
  end:      { type: Date },
  duration: { type: Number } // in minutes or seconds
});

module.exports = mongoose.model('Break', breakSchema);