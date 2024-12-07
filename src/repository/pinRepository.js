const PinModel = require('../models/pinModel');

class PinRepository {
  static async togglePin(providerName) {
    const pinEntry = await PinModel.findOne({ providerName });

    if (pinEntry) {
      // If the provider is already pinned, remove it
      await PinModel.deleteOne({ providerName });
      return { providerName, pinned: false };
    } else {
      // Otherwise, add it as pinned
      await PinModel.create({ providerName, pinned: true });
      return { providerName, pinned: true };
    }
  }
}

module.exports = PinRepository;
