const functions = require('firebase-functions');
const stackexchange = require('stackexchange');
const cors = require('cors')({origin: true});

const options = { version: 2.2};
const context = new stackexchange(options);

const filter ={
    key:'LVK)sErms8UPxq)iMh7gPQ((',
    pagesize:10,
    tagged: 'node.js',
    sort: 'activity',
    order: 'asc'
};

exports.getPosts = functions.https.onRequest((req,res) =>{
    return cors(req, res, async () => {
        let questions = null


        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send({body: req.body, results:questions});

        return null
    })
});