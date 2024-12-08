const middy = require('middy');
const { initDB } = require('../middleware/initDb');
const { errorHandler } = require('../middleware/errorHandler');
const ApiGetWeather = require('../routes/api-get-weather');

exports.handler = middy(async (event) => {
  return ApiGetWeather(event);
})
  .use(initDB)
  .use(errorHandler);