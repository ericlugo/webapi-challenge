const moment = require('moment');
const loggerExports = (module.exports = {});

loggerExports.logger = function(request, response, next) {
  console.log(`${request.method} request received for '${request.url}' at ${moment().format('h:mm:ss a')}`);
  next();
};
