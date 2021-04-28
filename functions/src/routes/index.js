const points = require('./points');
const users = require('./users');

module.exports = function routes(app) {
  users(app);
  points(app);
};
