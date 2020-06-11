const elastic = require('../utils/ElasticSearchService');
const index = {
  "name": "oauth-security",
  "body": {
    "mappings": {
      "oauth": {
        "properties": {
          "username": {
            "type": "keyword",
            "fields": {
              "text": {
                "type": "text"
              }
            }
          },
          "email": {
            "type": "keyword"
          },
          "password": {
            "type": "keyword"
          },
        }
      }
    }
  }
}
const createAuthIndex = async () => {
  const { name, body } = index;
  try {
    const exist = await elastic.indexExists(name);
    if (!exist) {
      const res = await elastic.initIndex(name, body);
      console.log({ res })
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = createAuthIndex;