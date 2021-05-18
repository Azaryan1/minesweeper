const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    easyBest: { type: Number, default: Infinity },
    mediumBest: { type: Number, default: Infinity },
    hardBest: { type: Number, default: Infinity },
  })
);

module.exports = User;
