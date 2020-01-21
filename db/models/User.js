const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('User', new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
}));