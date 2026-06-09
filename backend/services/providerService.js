const Provider = require('../models/Provider');

const listProviders = async () => {
  return await Provider.find().sort({ createdAt: -1 });
};

module.exports = { listProviders };
