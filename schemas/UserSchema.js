const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  coins: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  shopItems: {
    balls: { type: Number, default: 0 },
    lockpick: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('User', UserSchema)