const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
