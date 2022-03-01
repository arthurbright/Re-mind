//imports
require('dotenv').config();
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const http = require('http');
const Database = require('./database.js');

//login to the client

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    partials: [
        'CHANNEL', // Required to receive DMs
    ]
  })
client.login(process.env.BOT_TOKEN);


//on initial startup
client.on('ready', ()=>{
    console.log("Re:mind online!");
})


///////////////////////////////////////////////////////////
//types
interface Reminder {
    time: number;
    repeat: number;
}

interface Profile {
    user;
    reminders: Reminder[];
}

let users: Profile[] = [];

//let k:Profile= {tag: 'hi', reminders: []};




//////////////////////////////////////////////////////////////
//BEHAVIOR

//check if any reminders must be posted
setInterval(()=>{


    //ping server to keep awake

    if(!process.env.LOCAL){
        http.get("http://re--mind.herokuapp.com/");
    }


}, 10000)

client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore bot messages

    if(message.content === 'ooga'){
        message.author.send("booga");
        Database.testfun();
    }

    if(message.author.id === '304651275423842314'){
        client.users.fetch('360963947479957514', false).then((user) =>{
            user.send(message.content);
        })
    }

    if(message.author.id === '360963947479957514'){
        client.users.fetch('304651275423842314', false).then((user) =>{
            user.send(message.content);
        })
    }

    if(message.author.id === '304651275423842314'){
        client.users.fetch('304651275423842314', false).then((user) =>{
            user.send(message.content);
        })
    }


    //Database.testfun();


})








//////////////////////////////////////////////////////////////
//connecting to port to prevent crash
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) =>{
    console.log("pinged");
    res.end('hi');
});
server.listen(PORT, ()=>{
    console.log("server runnin");
});