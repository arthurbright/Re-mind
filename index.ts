//imports
require('dotenv').config();
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const http = require('http');
const Database = require('./database.js');
const Responses = require('./responses.js');

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


}, 60000)

client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore bot messages

    ///////////////////////////direct message code
    if(message.channel.type === "DM"){
        let words = message.content.split(" ");


        ////get list of all current reminds
        if(words[0].toLowerCase() === "get"){
            Database.getReminders(message.author.id).then((arr)=>{
                Responses.sendArr(message.author, arr);
            });
        }
        ////set a reminder
        else if(words[0].toLowerCase() === "set"){
            let inputTime = parseInt(words[2]);
            if(isNaN(inputTime) || words[1] == null){
                Responses.illegal(message.author);
                return;
            }

            let rem:Reminder = {
                userid: message.author.id,
                description: words[1],
                time: Date.now() + 60 * 1000 * parseInt(words[2]),
                repeat: 0
            }
            Database.addReminder(rem);
            Responses.confirmAdd(message.author, rem);
        }



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