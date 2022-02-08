const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Configuration
require('../database/mongodb.config');

// Express Application
const app = express();

//Body parser
app.use(express.json());

// Node server
const server = require('http').createServer(app);

// Routes
app.use('/express_backend', require('../routes/express.router'));
app.use('/api/gateway', require('../routes/gateway.router'));

const port = process.env.PORT || 3300;
server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Server running on port', port);
});