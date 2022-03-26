const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const colors = require('colors');


const filter = {};
const projection = {

};
const sort = {
    'cuisine': 1
};

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
            console.log("primera query:\n".blue, docs);
            console.log("___________________________________________________________".red)
        });

        coll.distinct('cuisine', { 'address.zipcode': '11414', 'address.street': 'Cross Bay Boulevard' }
            , function (err, docs) {
                assert.equal(err, null);
                console.log("segunda query:\n".blue, docs);
                console.log("___________________________________________________________".red)

            });


        coll.find({ name: { $regex: "Steak House" } }, { projection: { name: 1, address: 1 } })
            .toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("tercera query:\n".blue, docs);
                console.log("___________________________________________________________".red)
            });


        coll.find({
            cuisine: {
                $regex: "Pizza"
            },
            name: {
                $not: {
                    $regex: "Pizza|Pizzeria"
                }
            }
        }).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("cuarta query:\n".blue, "los restaurantes que contienen la palabra Pizza en la cocina pero\nNO contienen la palabra Pizza o Pizzería en el nombre del restaurante son: " + docs.length );
            console.log(docs);
            console.log("___________________________________________________________".red)

        });


        coll.distinct('name', {
            cuisine: {
                $regex: "Pizza"
            },
            borough: "Queens"
        }, function (err, docs) {
            assert.equal(err, null);
            console.log("quinta query:\n".blue, "los restaurantes que contienen la palabra Pizza en la cocina y que están en la ciudad de Queens son: " + docs.length);
            console.log(docs)
            console.log("___________________________________________________________".red)
        });


        setTimeout(function () {
            client.close();
        }
            , 2000);

    }
);