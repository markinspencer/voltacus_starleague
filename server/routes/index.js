const users = require('./user.routes');

module.exports = app => {
  app.use('api/users', users);
};
