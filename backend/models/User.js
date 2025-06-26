const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:   { type: String },
  email:      { type: String },
  password:   { type: String },
  googleId:   { type: String }, // for OAuth
  avatar:     { type: String }, // for Google profile picture
  authType:   { type: String, enum: ['local', 'google'], default: 'local' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
