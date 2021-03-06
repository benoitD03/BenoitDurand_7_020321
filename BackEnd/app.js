const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const isAdminRoutes = require('./routes/isAdmin');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api/users', userRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/admin', isAdminRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

  module.exports = app;