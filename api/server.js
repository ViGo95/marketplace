// Dependencies
require('dotenv').config();
const express = require('express');

// Modules
const config = require('./config')
const dbConnection = require('./config/dbConnection')
const router = require('./routes')

// Creating Server
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Middlewares
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// Archivos estaticos
// app.use('/', express.static('./website/public'))

// Routes
router(app)

// Server
app.listen(config.api.port, () => {
  console.log('Server listening on ' + config.api.host + config.api.port)
});

// Database Connection
dbConnection(config.mongoDB.URL)
