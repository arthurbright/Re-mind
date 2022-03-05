const Discord = require('discord.js');
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
    //keep an array of repeat alarms to set later
    let repeats = [];
    //query all expired reminders
    let cursor = db.collection('profiles').find({
        time: {$lt: curtime}
    });

    //do something with each one
    await cursor.forEach(async (doc) =>{

        //fetch each user and send the reminder
        user = await client.users.fetch(doc.userid, false)
        const embed = new Discord.MessageEmbed()
        .setColor('#26fffb')
        .setTitle("Reminder: " + doc.description);

        user.send({embeds: [embed]});
        if(doc.repeat != 0){
            repeats.push(doc);
        }
    });

    //delete expired reminders
    await db.collection('profiles').deleteMany({
        time: {$lt: curtime}
    });

    //add repeat reminders
    for(i = 0; i < repeats.length; i ++){
        let rem = repeats[i];
        rem.time += rem.repeat;
        addReminder(rem);
    }
}



function addReminder(rem){
    db.collection('profiles').insertOne({
        "time": rem.time,
        "description": rem.description,
        "repeat": rem.repeat,
        "userid": rem.userid
    });
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
        });
    });

    return arr;
}

module.exports.sendReminders = sendReminders;
module.exports.addReminder = addReminder;
module.exports.getReminders = getReminders;