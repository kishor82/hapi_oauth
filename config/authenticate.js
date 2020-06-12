const elastic = require('./ElasticSearchService');
const authenticateUser = async (username, password) => {
  const body = {
    query: {
      match: {
        username
      }
    }
  };
  const findUser = await elastic.searchDocuments('oauth-security', body);
  if (findUser.hits.hits.length) {
    if (findUser.hits.hits[0]._source.password === password) {
      return true;
    } else {
      throw new Error(`Password doesn't Match`);
    }
  } else {
    throw new Error(`User not found.`);
  }
};
module.exports = authenticateUser;