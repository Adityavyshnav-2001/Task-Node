const { fetchAllWeatherData } = require('../repository/weather.repository');
const { success, failure } = require('../utils/responses');

const ApiGetWeather = async (event) => {
  try {
    const weatherData = await fetchAllWeatherData();
    return success(weatherData);
  } catch (err) {
    console.error('Error in get weather api', err);
    return failure(err?.statusCode, err?.message);
  }
};

module.exports = ApiGetWeather;

