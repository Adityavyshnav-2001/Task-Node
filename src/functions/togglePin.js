const middy = require('middy');
const { initDB } = require('../middleware/initDb');
const { errorHandler } = require('../middleware/errorHandler');
const ApiTogglePin = require('../routes/api-toggle-pin');

exports.handler = middy(async (event) => {
  return ApiTogglePin(event);
})
  .use(initDB)
  .use(errorHandler);

