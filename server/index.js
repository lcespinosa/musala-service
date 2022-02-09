const express = require('express');
const app = express();

//Body parser
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Node server
const server = require('http').createServer(app);

// Routes
app.use('/test', (req, res) => {
  const array = [];
  res.json({array});
});
app.use('/api/gateways', require('../routes/gateway.router'));

const port = process.env.PORT || 3300;
server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Server running on port', port);
});

module.exports = server;