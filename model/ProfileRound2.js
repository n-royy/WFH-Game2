const mongoose = require('mongoose');

const ProfileRound2Schema = new mongoose.Schema({
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

module.exports = ProfileRound2 = mongoose.model(
  'profileRound2',
  ProfileRound2Schema
);
