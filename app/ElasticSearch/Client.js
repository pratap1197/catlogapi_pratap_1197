const es = require('elasticsearch');
const esClient = new es.Client({
    hosts: ['https://elastic:'+'pp4nIPqFp2*mrbGh55LX'+'@127.0.0.1:9200/'],
    log: 'trace',
});

module.exports = esClient;
