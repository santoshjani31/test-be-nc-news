const endpointsJson = require('../endpoints.json');
const { fetchApiTopics } = require('../models/api.models.');

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

exports.getApiTopics = (req, res) => {
  fetchApiTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
