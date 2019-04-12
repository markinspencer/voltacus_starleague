const express = require('express');
const addRoutes = require('./routes');
const { addPassport } = require('./services/auth.service');

const app = express();
addPassport(app);
addRoutes(app);

module.exports = app;
