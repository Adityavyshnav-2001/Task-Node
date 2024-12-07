const mongoose = require('mongoose');
const { APIError } = require('../utils/error');

async function initializeDB() {
  try {
    const mongoDBUrl =
      process.env.MONGO_DB_URL || 'mongodb://localhost:27017/weatherapp';

    return await mongoose.connect(mongoDBUrl, {
      maxPoolSize: 25,
      serverSelectionTimeoutMS: 50000, // Increase this timeout
      socketTimeoutMS: 45000,
    });
  } catch (err) {
    console.error('Error in connection of mongodb', err);
    throw new APIError(500, err?.message, null, err?.stack);
  }
}

module.exports = {
  initializeDB,
};
