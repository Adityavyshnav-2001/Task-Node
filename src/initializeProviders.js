const mongoose = require('mongoose');
const Provider = require('./models/Provider');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const providers = [
  {
    name: 'OpenWeatherMap',
    baseUrl: `https://api.openweathermap.org/data/2.5/weather?lat=19.0760&lon=72.8777&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
    apiKey: OPENWEATHER_API_KEY,
    isPinned: false,
  },
  {
    name: 'WeatherStack',
    baseUrl: `https://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=19.0760,72.8777`,
    apiKey: WEATHERSTACK_API_KEY,
    isPinned: false,
  },
  {
    name: 'WeatherAPI',
    baseUrl: `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=19.0760,72.8777`,
    apiKey: WEATHER_API_KEY,
    isPinned: false,
  },
];

async function initializeProviders() {
  try {
    await Provider.deleteMany({});

    await Provider.insertMany(providers);

    console.log('Providers initialized successfully');
  } catch (error) {
    console.error('Error initializing providers:', error);
  } finally {
    mongoose.disconnect();
  }
}

initializeProviders();
