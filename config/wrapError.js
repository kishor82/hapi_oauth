const Boom = require('boom');
const getErrorStatusCode = (error) => {
  return Boom.isBoom(error) ? error.output.statusCode : error.statusCode || error.status;
};

const wrapError = (error) => {
  return Boom.boomify(error, { statusCode: getErrorStatusCode(error) });
};

module.exports = wrapError;
