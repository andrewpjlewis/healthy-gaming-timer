const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  user:                { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  sessionTimeLimit:    { type: Number, default: 60 }, // in minutes
  breakReminderTime:   { type: Number, default: 15 }, // every X minutes
  notificationsEnabled:{ type: Boolean, default: true },
  darkMode:            { type: Boolean, default: false }
});

module.exports = mongoose.model('Settings', settingsSchema);