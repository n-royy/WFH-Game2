const mongoose = require('mongoose');

const ProfileRound3Schema = new mongoose.Schema({
  username: {
    type: String,
  },
  unit: {
    type: String,
  },
  score: {
    type: Number,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Ticket must be have creator'],
    ref: 'User',
  },
});

module.exports = ProfileRound3 = mongoose.model(
  'profileRound3',
  ProfileRound3Schema
);
