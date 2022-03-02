//imports
require('dotenv').config();
var Discord = require('discord.js');
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
var http = require('http');
var Database = require('./database.js');
var Responses = require('./responses.js');
//login to the client
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    partials: [
        'CHANNEL', // Required to receive DMs
    ]
});
client.login(process.env.BOT_TOKEN);
//on initial startup
client.on('ready', function () {
    console.log("Re:mind online!");
});
//////////////////////////////////////////////////////////////
//BEHAVIOR
//check if any reminders must be posted
setInterval(function () {
    //ping server to keep awake
    if (!process.env.LOCAL) {
        http.get("http://re--mind.herokuapp.com/");
    }
    //check for reminders
    Database.sendReminders(client, Date.now());
}, 120000);
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    //debug code
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
    ///////////////////////////direct message code
    if (message.channel.type === "DM") {
        var words = message.content.split(" ");
        ////get list of all current reminds
        if (words[0] === "get") {
            Database.getReminders(message.author.id).then(function (arr) {
                Responses.sendArr(message.author, arr);
            });
        }
        ////set a reminder
        else if (words[0] === "set") {
            Database.addReminder(message.author.id, words[1], Date.now(), 0);
        }
    }
});
//////////////////////////////////////////////////////////////
//connecting to port to prevent crash
var PORT = process.env.PORT || 3000;
var server = http.createServer(function (req, res) {
    console.log("pinged");
    res.end('hi');
});
server.listen(PORT, function () {
    console.log("server runnin");
});
