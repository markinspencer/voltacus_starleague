const auth = require('./auth.routes');
const users = require('./user.routes');

module.exports = app => {
  app.use('/api/users', users);
  app.use('/auth', auth);
};
