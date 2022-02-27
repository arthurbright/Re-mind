//imports
require('dotenv').config();
var Discord = require('discord.js');
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
var http = require('http');
var Database = require('./database.js');
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
var users = [];
//let k:Profile= {tag: 'hi', reminders: []};
//////////////////////////////////////////////////////////////
//BEHAVIOR
//check if any reminders must be posted
setInterval(function () {
    //ping server to keep awake
    client.users.fetch('304651275423842314', false).then(function (user) {
        //user.send('boyiboyi');
    });
    if (!process.env.LOCAL) {
        http.get("http://re--mind.herokuapp.com/");
    }
}, 10000);
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    if (message.content === 'ooga') {
        message.author.send("booga");
        Database.testfun();
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
