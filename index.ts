//imports
require('dotenv').config();
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const http = require('http');

//login to the client

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
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
let main;

//check if any reminders must be posted
setInterval(()=>{


    //ping server to keep awake
    main.send("hey there cutie");
    if(!process.env.LOCAL){
        http.get("http://re--mind.herokuapp.com/");
    }


}, 60000)

client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore bot messages

    if(message.content === 'ooga'){
        message.author.send("booga");
        main = message.author;
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