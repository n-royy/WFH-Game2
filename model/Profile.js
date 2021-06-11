const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);
