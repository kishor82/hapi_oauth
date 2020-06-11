const elasticConnection = {
  host: 'localhost:9200',
  log: 'info'
}
const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client(elasticConnection);
const ElasticSearch = {
  indexExists: function (indexName) {
    return elasticClient.indices.exists({
      index: indexName
    });
  },
  initIndex: function (indexName, body) {
    console.log({ indexName }, { body })
    return elasticClient.indices.create({
      index: indexName,
      body
    });
  },
  createIndex: function (indexName, body) {
    return elasticClient.index({
      index: indexName,
      type: 'oauth',
      id: Math.random(),
      body
    })
  },
  getById: function (indexName, type, id) {
    return elasticClient.getSource({
      index: indexName,
      type: type,
      id: id
    });
  },
  searchDocuments: function (indexName, query) {
    console.log('heerrr tooo...')
    return elasticClient.search({
      index: indexName,
      body: { ...query }
    });
  }

};
module.exports = ElasticSearch;
