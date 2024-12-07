const mongoose = require('mongoose');
const Provider = require('../models/Provider');

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event) => {
  try {
    const { providerName } = JSON.parse(event.body);

    if (!providerName) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        },
        body: JSON.stringify({ message: 'Provider name is required' }),
      };
    }

    const provider = await Provider.findOne({ name: providerName });

    if (!provider) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        },
        body: JSON.stringify({ message: 'Provider not found' }),
      };
    }

    provider.isPinned = !provider.isPinned;
    await provider.save();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': false,
      },
      body: JSON.stringify({
        message: 'Provider pin status toggled successfully',
        provider: provider,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': false,
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
