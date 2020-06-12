const elastic = require('../config/ElasticSearchService');
const wrapError = require('../config/wrapError');
const createUser = async (req) => {
  const { email, username, password } = req.payload;
  const body = {
    email,
    username,
    password
  };
  try {
    const res = await elastic.createIndex("oauth-security", body);
    return res;
  } catch (e) {
    throw wrapError(e);
  }
};

module.exports = createUser;