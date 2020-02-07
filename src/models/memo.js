const mongoose = require('mongoose');

const User = require('./user');
const MemoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  content: {
    type: String,
    required: true
  },
  tagIds: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: []
  }],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Memo', MemoSchema);