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
    userid: string;
    description: string;
    time: number;
    repeat: number;
}

//////////////////////////////////////////////////////////////
//BEHAVIOR

//check if any reminders must be posted
setInterval(()=>{

    //ping server to keep awake
    if(!process.env.LOCAL){
        http.get("http://re--mind.herokuapp.com/");
    }

    //check for reminders
    Database.sendReminders(client, Date.now());


}, 30000)

client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore bot messages

    /* code for dming felix
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
    */

    if(message.content === "a"){
        Database.debugDoc(Date.now(), "past reminder");
    }
    else if(message.content === 'b'){
        Database.debugDoc(Date.now() + 60000, "future reminder");
    }
    else if(message.content === 'c'){
        Database.sendReminders(client, Date.now());
    }




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