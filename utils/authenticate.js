const elastic = require('./ElasticSearchService');
const authenticateUser = async (req) => {
  const { username, password } = req.payload;
  const body = {
    query: {
      match: {
        username: username
      }
    }
  }
  try {
    const findUser = await elastic.searchDocuments('oauth-security', body);
    if (findUser.hits.hits.length) {
      if (findUser.hits.hits[0]._source.password === password) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return err;
  }
}

module.exports = authenticateUser;