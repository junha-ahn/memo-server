const mongoose = require('mongoose');

const User = require('./user');
const Tag = require('./tag');
const MemoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  isFixed: {
    type: Number,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Tag,
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