const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  baseUrl: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Provider', providerSchema);
