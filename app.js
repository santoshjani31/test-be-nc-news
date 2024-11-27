const express = require('express');
const { getApi, getApiTopics } = require('./controllers/api.controllers');
const app = express();

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

module.exports = app;
