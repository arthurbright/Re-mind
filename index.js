//imports
require('dotenv').config();
var Discord = require('discord.js');
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
//login to the client
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
});
client.login(process.env.BOT_TOKEN);
//on initial startup
client.on('ready', function () {
    console.log("Re:mind online!");
});
//let k:Profile= {tag: 'hi', reminders: []};
//onsole.log(k.tag);
//////////////////////////////////////////////////////////////
//BEHAVIOR
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    console.log('hi');
    if (message.content === 'ooga') {
        message.author.send("booga");
    }
});
