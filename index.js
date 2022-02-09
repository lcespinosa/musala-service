const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Configuration
require('./database/mongodb.config').dbConnection();

// Express Application
require('./server');