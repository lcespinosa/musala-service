const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

/**
 * This file contains all steps for server initialization
 *
 * */

const app = express();
const port = process.env.PORT || 5000;

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API calls
app.use('/test', (req, res) => {
  const array = [];
  res.json({array});
});
app.use('/api/gateways', require('../routes/gateway.router'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;