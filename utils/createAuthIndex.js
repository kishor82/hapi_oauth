const elastic = require('../config/ElasticSearchService');
const wrapError = require('../config/wrapError');
const mappings = require('../mappings/oauth_security_index_mappings.json');
const index = {
  "name": "oauth-security",
  "body": { ...mappings }
};
const createAuthIndex = async () => {
  const { name, body } = index;
  const defaultUser = {
    email: 'admin@gmail.com',
    username: 'admin',
    password: 'admin',
  };
  try {
    const exist = await elastic.indexExists(name);
    if (!exist) {
      await elastic.initIndex(name, body);
      await elastic.createIndex("oauth-security", defaultUser);
    }
  } catch (e) {
    throw wrapError(e);
  }
};

module.exports = createAuthIndex;