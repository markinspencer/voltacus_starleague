const express = require('express');
const addRoutes = require('./routes');

const app = express();
addRoutes(app);

module.exports = app;
