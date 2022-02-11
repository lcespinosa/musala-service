const express = require('express');
require('dotenv').config();

/**
 * This file is the entry point for server start
 *
 * */

// DB Configuration
require('./database/mongodb.config').dbConnection();

// Express Application
const app = require('./server');