//imports
require('dotenv').config();
var Discord = require('discord.js');
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
var http = require('http');
//login to the client
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
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
var main;
//check if any reminders must be posted
setInterval(function () {
    //ping server to keep awake
    main.send("hey there cutie");
    if (!process.env.LOCAL) {
        http.get("http://re--mind.herokuapp.com/");
    }
}, 60000);
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    if (message.content === 'ooga') {
        message.author.send("booga");
        main = message.author;
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
