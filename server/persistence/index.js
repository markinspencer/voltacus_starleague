const Sequelize = require('sequelize');

const { PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const db = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => 'Database connected...')
  .catch(err => console.error(err));

module.exports = db;
