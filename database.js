const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://remindusername:" + process.env.MONGOPW + "@cluster0.ph2km.mongodb.net/main?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var db;
client.connect(err => {
    if(err){
        console.log("Error connecting to database");
        console.log(err);
        return;
    }
  db = client.db("main");
  console.log('Connected to database!');

});

async function sendReminders(client,  curtime){

    //query all expired reminders
    let cursor = db.collection('profiles').find({
        time: {$lt: curtime}
    });

    //do something with each one
    await cursor.forEach(async (doc) =>{
        user = await client.users.fetch(doc.userid, false)
        user.send(doc.description + " has expired!"); //send user the reminder
        
    });

    //delete expired reminders
    db.collection('profiles').deleteMany({
        time: {$lt: curtime}
    });
}


function debugDoc(time, desc){
    db.collection('profiles').insertOne({"time": time, "description": desc});
}


function addReminder(userid, description, time, repeat){
    db.collection('profiles').insertOne({
        "time": time, "description": description, "userid": userid, "repeat": repeat})
}

async function getReminders(userid_){
    
    let arr = [];

     //query all reminders by the user
     let cursor = db.collection('profiles').find({
        userid: userid_
    });

     //do something with each one
    //TODO
    await cursor.forEach((doc) =>{
        arr.push({
            "time": doc.time,
            "description": doc.description,
            "userid": userid_,
            "repeat": doc.repeat,
            "id": doc._id
        })
    });

    return arr;
}


module.exports.debugDoc = debugDoc;
module.exports.sendReminders = sendReminders;
module.exports.addReminder = addReminder;
module.exports.getReminders = getReminders;