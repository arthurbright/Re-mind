const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://remindusername:remindpassword@cluster0.ph2km.mongodb.net/main?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var collection = null;
client.connect(err => {
    if(err){
        console.log("Error connecting to database");
    }
  collection = client.db("main").collection("profiles");
  console.log('Connected to database!');

});


function testfun(){
    collection.insertOne({"fat": "ooga"});
}


module.exports.testfun = testfun;