const Sequelize = require('sequelize');
const db = require('../persistence');

const User = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  race: {
    type: Sequelize.INTEGER
  },
  mmr: {
    type: Sequelize.INTEGER
  },
  token: {
    type: Sequelize.STRING
  },
  battleTag: {
    type: Sequelize.STRING
  },
  provider: {
    type: Sequelize.STRING
  },
  profileId: {
    type: Sequelize.STRING
  }
});

module.exports = User;
