const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['break', 'hydration', 'posture'], required: true },
  frequency: { type: Number, required: true }, // in minutes
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);