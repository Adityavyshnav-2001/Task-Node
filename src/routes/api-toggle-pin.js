const { toggleProviderPin } = require('../repository/provider.repository');
const { success, failure } = require('../utils/responses');

const ApiTogglePin = async (event) => {
  try {
    const { providerName } = JSON.parse(event.body);

    if (!providerName) {
      return failure(400, 'Provider name is required');
    }

    const updatedProvider = await toggleProviderPin(providerName);

    if (!updatedProvider) {
      return failure(404, 'Provider not found');
    }

    return success({
      message: 'Provider pin status toggled successfully',
      provider: updatedProvider,
    });
  } catch (err) {
    console.error('Error in toggle pin api', err);
    return failure(err?.statusCode, err?.message);
  }
};

module.exports = ApiTogglePin;

