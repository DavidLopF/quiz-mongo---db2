const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const colors = require('colors');
const { set } = require('mongoose');

let querys = []


MongoClient.connect(
    'mongodb+srv://spenaa:Loquendero123@bd-2.nfcfo.mongodb.net/test?authSource=admin&replicaSet=atlas-60yigm-shard-0&readPreference=primary&appname=MongoDB+Compass&ssl=true',
    { useNewUrlParser: true, useUnifiedTopology: true },

    function (connectErr, client) {
        assert.equal(null, connectErr);
        const coll = client.db('david_DB').collection('temp');

        coll.distinct('cuisine', {
            'cuisine': {
                $exists: true
            }
        }, function (err, docs) {
            assert.equal(err, null);
            const query = {
                number: 1,
                name: "primera query",
                resultado:
                    docs
            }

            querys.push(query)
        });


        coll.distinct('cuisine', { 'address.zipcode': '11414', 'address.street': 'Cross Bay Boulevard' }
            , function (err, docs) {
                assert.equal(err, null);
                const query = {
                    number: 2,
                    name: "segunda query",
                    resultado:
                        docs
                }

                querys.push(query)
            });


        coll.find({ name: { $regex: "Steak House" } }, { projection: { name: 1, address: 1 } })
            .toArray(function (err, docs) {
                assert.equal(err, null);

                //hacer que se vean los datos de docs en json
                const query = {
                    number: 3,
                    name: "tercera query",
                    resultado:
                        JSON.stringify(docs, null, 2)
                }

                querys.push(query)
            });


        coll.find({
            cuisine: {
                $regex: "Pizza"
            },
            name: {
                $nin: ["Pizzeria", "Pizza"]
            }

        }).toArray(function (err, docs) {
            assert.equal(err, null);
            const query = {
                number: 4,
                name: "cuarta query",
                resultado:
                    JSON.stringify(docs, null, 2)
            }

            querys.push(query)
        });



        coll.distinct('name', {
            cuisine: {
                $regex: "Pizza"
            },
            borough: "Queens"
        }, function (err, docs) {
            assert.equal(err, null);

            const query = {
                number: 5,
                name: "quinta query",
                resultado:
                    docs
            }

            querys.push(query)

        });

        coll.count({
            cuisine: "Hamburgers"
        }).then(function (docs) {
            const query = {
                number: 6,
                name: "sexta query",
                resultado:
                    "los restaurantes que su cocina tiene como nombre hamburguesas son: " + docs
            }

            querys.push(query)
        }
        );

        coll.count({
            cuisine: "Hamburgers",
            borough: "Manhattan"
        }).then(function (docs) {
            const query = {
                number: 7,
                name: "septima query",
                resultado:
                    "los restaurantes que su cocina tiene como nombre hamburguesas y que estan en Manhattan son: " + docs
            }

            querys.push(query)
        })

        coll.count({
            cuisine: "Hamburgers",
            borough: "Manhattan",
            name: {
                $nin: ["McDonald's"]
            }
        }).then(function (docs) {
            const query = {
                number: 8,
                name: "octava query",
                resultado:
                    "los restaurantes que su cocina tiene como nombre hamburguesas y que estan en Manhattan y que no son Mcdonald's son: " + docs
            }

            querys.push(query)
        })

        coll.count({
            cuisine: "Hamburgers",
            borough: "Manhattan",
            $and: [{
                name: {
                    $nin: ["McDonald's"]
                },
                name: {
                    $ne: "Burger King"
                }
            }]
        }).then(function (docs) {
            const query = {
                number: 9,
                name: "novena query",
                resultado:
                    "los restaurantes que su cocina tiene como nombre hamburguesas y que estan en Manhattan y que no son Mcdonald's y que no son Burger King son: " + docs
            }

            querys.push(query)
        })

        coll.find({
            cuisine: 'Hamburgers',
            'address.street': 'Pearl Street',
        }, { _id: 0, name: 1 }
        ).toArray(function (err, docs) {
            assert.equal(err, null);
            const query = {
                number: 10,
                name: "decima query",
                resultado:
                    JSON.stringify(docs, null, 2)
            }

            querys.push(query)
        });

        coll.distinct("name", { "address.street": "Pearl Street", cuisine: "Hamburgers" }).then(function (docs) {
            const query = {
                number: 11,
                name: "onceava query",
                resultado:
                    "los restaurantes que estan en Pearl Street son: " + docs
            }

            querys.push(query)
        })


    });

setTimeout(function () {
    console.log("esperando querys...")
}, 5000);


setTimeout(function () {
    querys.sort(function (a, b) {
        return a.number - b.number
    })
    console.log(querys)
}, 6000);

