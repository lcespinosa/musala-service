const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

//Body parser
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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