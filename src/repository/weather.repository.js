const Provider = require('../models/provider.model');
const axios = require('axios');

const fetchAllWeatherData = async () => {
  const providers = await Provider.find({});

  const weatherResults = await Promise.allSettled(
    providers.map((provider) => fetchWeatherData(provider))
  );

  return weatherResults.reduce((acc, result) => {
    if (result.status === 'fulfilled') {
      const { name, data } = result.value;
      acc[name] = {
        ...data,
        isPinned: providers.find((p) => p.name === name).isPinned,
      };
    } else {
      const { name, error } = result.reason;
      acc[name] = {
        error: error || 'Unknown error occurred',
        isPinned: providers.find((p) => p.name === name).isPinned,
      };
    }
    return acc;
  }, {});
};

const fetchWeatherData = async (provider) => {
  const { name, baseUrl, apiKey } = provider;

  try {
    const response = await axios.get(baseUrl, {
      params: { apiKey },
    });
    console.log(`Response from ${name}:`, response.data);
    return { name, data: normalizeWeatherData(name, response.data) };
  } catch (error) {
    console.error(`Error fetching data from ${name}:`, error.message);
    return { name, error: error.message };
  }
};

const normalizeWeatherData = (providerName, data) => {
  switch (providerName) {
    case 'OpenWeatherMap':
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
      };
    case 'WeatherStack':
      return {
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        description: data.current.weather_descriptions[0],
      };
    case 'WeatherAPI':
      return {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
      };
    default:
      return data;
  }
};

module.exports = {
  fetchAllWeatherData,
};

