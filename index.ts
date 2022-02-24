//imports
require('dotenv').config();
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');

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
    tag: string;
    reminders: Reminder[];
}

//let k:Profile= {tag: 'hi', reminders: []};

//onsole.log(k.tag);


//////////////////////////////////////////////////////////////
//BEHAVIOR

client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore bot messages
    console.log('hi');

    if(message.content === 'ooga'){
        message.author.send("booga");
    }
})