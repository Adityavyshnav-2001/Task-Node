const mongoose = require('mongoose');
const Provider = require('./models/Provider');
const dotenv = require('dotenv');
dotenv.config();

const OPENWEATHER_API_KEY = '3e678eb08a1805f1dde9dbb666dbaa42';
const WEATHER_API_KEY = '1cc87ae5261546aa90b61118242511';
const WEATHERSTACK_API_KEY = '52b1d5eb942f513652a704b354d8a202';
const mongodbURL = 'mongodb://localhost:27017/WeatherApp';

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const providers = [
  {
    name: 'OpenWeatherMap',
    baseUrl: `https://api.openweathermap.org/data/2.5/weather?lat=19.0760&lon=72.8777&appid=${OPENWEATHER_API_KEY}&units=metric`,
    apiKey: OPENWEATHER_API_KEY,
    isPinned: false,
  },
  {
    name: 'WeatherStack',
    baseUrl: `https://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=19.0760,72.8777`,
    apiKey: WEATHERSTACK_API_KEY,
    isPinned: false,
  },
  {
    name: 'WeatherAPI',
    baseUrl: `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=19.0760,72.8777`,
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
