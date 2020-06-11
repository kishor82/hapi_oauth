const elastic = require('../utils/ElasticSearchService');
const createUser = async (req) => {
  const { email, username, password } = req.payload;
  const body = {
    email,
    username,
    password
  }
  // const { name, body } = index;
  try {

    const res = await elastic.createIndex("oauth-security", body);
    return res
  } catch (err) {
    console.error(err);
  }
}

module.exports = createUser;