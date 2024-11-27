const express = require('express');
const {
  getApi,
  getTopics,
  getArticlesById,
  getArticles,
} = require('./controllers/api.controllers');
const {
  postgresErrorHandler,
  serverErrorHandler,
  customErrorHandler,
} = require('./error-handlers');
const app = express();

app.get('/api', getApi);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getArticles);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
