const es = require('elasticsearch');
//Set Elastic Client to localhost
const esClient = new es.Client({
    hosts: ['https://elastic:' + 'pp4nIPqFp2*mrbGh55LX' + '@127.0.0.1:9200/'],
    log: 'trace',
});

class ElasticSearch {

    // Check if index exists and create new if it doesn't
    static async existsIndex(ind) {
        let result = null;
        result = await esClient.indices.exists({index: ind})
        if (result == false) {
            let indexCreated = await esClient.indices.create({
                index: ind
            });
            console.log("Index created with name", indexCreated)
            return indexCreated;
        } else {
            console.log("Index already exists..!!!")
        }
    }

    //Insert new Document in elastic search
    static async insertDoc(indexName, _id, data) {
        try {
            return await esClient.index({
                index: indexName,
                id: _id,
                body: data
            });
        } catch (e) {
            console.log("Exception ", e)
        }
    }

    //Get Documnet by id, as well as any other fields
    static async getDocById(query) {
        try {
            let Doc = await esClient.search(query).then(resp => {
                if (!resp) {
                    console.log("No record")
                }
                console.log("Records found", JSON.stringify(resp))
            }).catch(err => {
                console.log("Error ", err)
            })

        } catch (e) {
            console.log("Exception ", e)
        }
    }

    //Get all documents from a particular index
    static async getAllDoc(index) {
        try {
            let Doc = esClient.search({
                index: index,
                size: 10000,
                body: {
                    query: {
                        "match_all": {}
                    }
                }
            }).then(resp => {
                if (!resp) {
                    console.log("No record")
                }
                console.log("Records found", JSON.stringify(resp))
            }).catch(err => {
                console.log("Error ", err)
            })

        } catch (e) {
            console.log("Exception ", e)
        }
    }

    //Update document from a particular index
    static async updateDoc(index, id, data) {
        try {
            let Doc = esClient.update({
                index,
                id,
                body: {
                    doc: data
                }
            }).then(resp => {
                if (!resp) {
                    console.log("Update Failed")
                }
                console.log("Update Success", JSON.stringify(resp))
            }).catch(err => {
                console.log("Error ", err)
            })

        } catch (e) {
            console.log("Exception ", e)
        }
    }


}


module.exports = ElasticSearch;

