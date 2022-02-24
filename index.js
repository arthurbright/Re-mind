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
//let k:Profile= {tag: 'hi', reminders: []};
//onsole.log(k.tag);
//////////////////////////////////////////////////////////////
//BEHAVIOR
var main;
//check if any reminders must be posted
setInterval(function () {
    main.send("hey");
}, 30000);
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    console.log('hi');
    if (message.content === 'ooga') {
        message.author.send("booga");
        main = message.author;
    }
});
//////////////////////////////////////////////////////////////
//connecting to port to prevent crash
var PORT = process.env.PORT || 3000;
var server = http.createServer(function (req, res) {
    res.end('hi');
});
server.listen(PORT, function () {
    console.log("server runnin");
});
