const Provider = require('../models/provider.model');

const toggleProviderPin = async (providerName) => {
  const provider = await Provider.findOne({ name: providerName });

  if (!provider) {
    return null;
  }

  provider.isPinned = !provider.isPinned;
  return provider.save();
};

module.exports = {
  toggleProviderPin,
};

