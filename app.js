const express = require('express');
const {
  getApi,
  getApiTopics,
  getArticlesById,
} = require('./controllers/api.controllers');
const {
  postgresErrorHandler,
  serverErrorHandler,
  customErrorHandler,
} = require('./error-handlers');
const app = express();

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

app.get('/api/articles/:article_id', getArticlesById);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
